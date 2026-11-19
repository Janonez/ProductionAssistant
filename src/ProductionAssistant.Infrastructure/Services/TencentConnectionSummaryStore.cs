using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace ProductionAssistant.Services;

[JsonConverter(typeof(JsonStringEnumConverter<TencentConnectionState>))]
public enum TencentConnectionState { NotConnected, Connected, NeedsLogin, AccessDenied, ReadOnly }

[JsonConverter(typeof(JsonStringEnumConverter<TencentConnectionInvalidation>))]
public enum TencentConnectionInvalidation { LoginExpired, LoginCleared, AccessDenied, ReadOnly, AccountChanged, DocumentChanged, ProfileChanged }

[JsonConverter(typeof(JsonStringEnumConverter<TencentConnectionDiagnostic>))]
public enum TencentConnectionDiagnostic { Timeout, NetworkError, PageIncomplete, Cancelled, Unavailable }

public sealed record TencentConnectionDocument(string TaskId, int ConfigRevision, string DocumentIdentity)
{
    public static TencentConnectionDocument? FromJob(JsonObject job)
    {
        var identity = Normalize((string?)job["config"]?["documentUrl"]);
        return (string?)job["id"] is { Length: > 0 } id && identity is not null
            ? new(id, (int?)job["configRevision"] ?? 0, identity)
            : null;
    }

    internal static string? Normalize(string? url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) && uri.Scheme == "https" &&
        uri.Host is "docs.qq.com" or "doc.weixin.qq.com" && uri.IsDefaultPort && uri.UserInfo.Length == 0
            ? uri.GetLeftPart(UriPartial.Path).TrimEnd('/') : null;
}

public sealed record TencentConnectionSummary(TencentConnectionDocument Document, string? AccountId, Guid? ProfileGeneration,
    TencentConnectionState State, DateTimeOffset? ConfirmedAt = null, string? Reason = null, string? DocumentName = null,
    DateTimeOffset? LoginExpiresAt = null, TencentConnectionDiagnostic? LastDiagnostic = null, DateTimeOffset? LastDiagnosticAt = null);

public sealed record TencentConnectionEvent(DateTimeOffset ObservedAt, TencentConnectionDocument? Document = null,
    TencentConnectionInvalidation? Invalidation = null, TencentConnectionDiagnostic? Diagnostic = null, Guid? ProfileGeneration = null,
    bool AuthenticationConfirmed = false, string? AccountId = null, DateTimeOffset? LoginExpiresAt = null,
    DateTimeOffset? EditableConfirmedAt = null, string? DocumentName = null);

public sealed record TencentLegacyConnection(string TaskId, int ConfigRevision, DateTimeOffset CheckedAt, string? DocumentName);

public sealed class TencentConnectionSummaryStore
{
    public const string FileName = "tencent-connection-summaries.json";
    private readonly string _path;
    private readonly string _generationPath;
    private readonly Action<string> _diagnostic;
    private readonly AtomicJsonStore<Snapshot> _store;

    private sealed record Snapshot(Dictionary<string, TencentConnectionSummary> Documents, Guid? ProfileGeneration = null,
        string? AccountId = null, DateTimeOffset? LoginExpiresAt = null, DateTimeOffset? ProfileInvalidatedAt = null,
        TencentConnectionInvalidation? ProfileReason = null);

    public TencentConnectionSummaryStore(string dataDirectory, Action<string>? diagnostic = null)
    {
        _path = Path.Combine(dataDirectory, FileName);
        _generationPath = Path.Combine(dataDirectory, "tencent-sheet-profile", ".metis-generation");
        _diagnostic = diagnostic ?? Console.Error.WriteLine;
        _store = new(_path, () => new(new(StringComparer.Ordinal)), IsValid, _diagnostic);
    }

    // Emitted in the process that committed the change. One shared-profile event can change several records.
    public event Action<IReadOnlyList<TencentConnectionSummary>>? StatusChanged;

    public TencentConnectionSummary Read(TencentConnectionDocument document)
    {
        if (!File.Exists(_path)) _diagnostic($"{FileName} 缺失，文档连接状态使用默认值。");
        var snapshot = _store.Read();
        if (snapshot.ProfileGeneration is not null && ProfileGeneration(create: false) != snapshot.ProfileGeneration)
        {
            Apply(new(DateTimeOffset.UtcNow, Invalidation: TencentConnectionInvalidation.ProfileChanged));
            snapshot = _store.Read();
        }
        return ForDocument(snapshot, document);
    }

    internal Guid? ProfileGeneration(bool create)
    {
        try
        {
            if (Guid.TryParseExact(File.ReadAllText(_generationPath), "N", out var existing)) return existing;
            return create ? WriteGeneration(FileMode.Create) : null;
        }
        catch (DirectoryNotFoundException) { return null; }
        catch (FileNotFoundException) { return create ? WriteGeneration(FileMode.CreateNew) : null; }
    }

    // Only the holder of the existing Playwright profile lease can stamp an existing profile.
    private Guid WriteGeneration(FileMode mode)
    {
        var generation = Guid.NewGuid();
        using var stream = new FileStream(_generationPath, mode, FileAccess.Write, FileShare.Read);
        using var writer = new StreamWriter(stream);
        writer.Write(generation.ToString("N"));
        return generation;
    }

    public void ImportLegacy(IEnumerable<TencentLegacyConnection> entries, IEnumerable<TencentConnectionDocument> documents)
    {
        var configured = documents.ToDictionary(document => document.TaskId, StringComparer.Ordinal);
        var changes = _store.Update<IReadOnlyList<TencentConnectionSummary>>(snapshot =>
        {
            var imported = new List<TencentConnectionSummary>();
            foreach (var entry in entries)
            {
                if (entry is null || string.IsNullOrWhiteSpace(entry.TaskId) ||
                    !configured.TryGetValue(entry.TaskId, out var document) || document.ConfigRevision != entry.ConfigRevision ||
                    entry.CheckedAt == default || snapshot.ProfileInvalidatedAt is { } invalidated && entry.CheckedAt <= invalidated)
                    continue;
                var current = ForDocument(snapshot, document);
                if (current.ConfirmedAt is not null || current.Reason is not null) continue;
                var summary = current with { State = TencentConnectionState.Connected, ConfirmedAt = entry.CheckedAt,
                    Reason = "LegacyImported", DocumentName = CleanName(entry.DocumentName) };
                snapshot.Documents[document.TaskId] = summary;
                imported.Add(summary);
            }
            return (imported.Count > 0 ? snapshot : null, imported);
        });
        Notify(changes);
    }

    public void Apply(TencentConnectionEvent observation)
    {
        var changes = _store.Update<IReadOnlyList<TencentConnectionSummary>>(snapshot =>
        {
            var before = new Dictionary<string, TencentConnectionSummary>(snapshot.Documents, StringComparer.Ordinal);
            var reason = observation.Invalidation;
            var generation = observation.ProfileGeneration ?? snapshot.ProfileGeneration;
            var account = observation.AccountId ?? snapshot.AccountId;
            if (reason == TencentConnectionInvalidation.ProfileChanged || observation.ProfileGeneration is { } observedGeneration &&
                snapshot.ProfileGeneration is { } previousGeneration && observedGeneration != previousGeneration)
            {
                // A read detecting replacement must recheck inside the transaction.
                generation = observation.ProfileGeneration ?? ProfileGeneration(create: false);
                if (generation == snapshot.ProfileGeneration) reason = null;
                else
                {
                    reason = TencentConnectionInvalidation.ProfileChanged;
                    account = observation.AccountId;
                }
            }
            if (reason is not (TencentConnectionInvalidation.ProfileChanged or TencentConnectionInvalidation.LoginCleared or TencentConnectionInvalidation.LoginExpired) && observation.AccountId is { } observedAccount &&
                snapshot.AccountId is { } previousAccount && observedAccount != previousAccount)
                reason = TencentConnectionInvalidation.AccountChanged;

            var shared = reason is TencentConnectionInvalidation.LoginExpired or TencentConnectionInvalidation.LoginCleared or
                TencentConnectionInvalidation.ProfileChanged or TencentConnectionInvalidation.AccountChanged;
            var cleared = reason == TencentConnectionInvalidation.LoginCleared;
            if (cleared) { generation = null; account = null; }
            var next = snapshot with
            {
                ProfileGeneration = generation,
                AccountId = account,
                LoginExpiresAt = observation.AuthenticationConfirmed && reason is not (TencentConnectionInvalidation.LoginExpired or TencentConnectionInvalidation.LoginCleared)
                    ? observation.LoginExpiresAt : shared ? null : snapshot.LoginExpiresAt,
                ProfileInvalidatedAt = shared ? observation.ObservedAt : snapshot.ProfileInvalidatedAt,
                ProfileReason = shared ? reason : observation.AuthenticationConfirmed ? null : snapshot.ProfileReason
            };
            foreach (var row in before.Values)
            {
                var scoped = row with { ProfileGeneration = generation, AccountId = account, LoginExpiresAt = next.LoginExpiresAt };
                next.Documents[row.Document.TaskId] = shared ? Invalidate(scoped, reason!.Value, observation.ObservedAt) : scoped;
            }

            if (observation.Document is { } document &&
                (!before.TryGetValue(document.TaskId, out var current) || current.Document.ConfigRevision <= document.ConfigRevision))
            {
                var row = ForDocument(next, document);
                if (reason is { } invalidation) row = Invalidate(row, invalidation, observation.ObservedAt);
                else if (observation.EditableConfirmedAt is { } confirmed && (row.ConfirmedAt is null || confirmed >= row.ConfirmedAt))
                    row = row with { State = TencentConnectionState.Connected, ConfirmedAt = confirmed, Reason = "Confirmed",
                        DocumentName = CleanName(observation.DocumentName) ?? row.DocumentName };
                if (observation.Diagnostic is { } diagnostic)
                    row = row with { LastDiagnostic = diagnostic, LastDiagnosticAt = observation.ObservedAt };
                next.Documents[document.TaskId] = row;
            }

            var modified = next != snapshot || next.Documents.Count != before.Count ||
                next.Documents.Any(pair => !before.TryGetValue(pair.Key, out var old) || old != pair.Value);
            var updated = next.Documents.Values.Where(row => !before.TryGetValue(row.Document.TaskId, out var old)
                ? row.State != TencentConnectionState.NotConnected
                : old.Document != row.Document || old.State != row.State || old.Reason != row.Reason).ToArray();
            return (modified ? next : null, updated);
        });
        Notify(changes);
    }

    public void TryApply(TencentConnectionEvent observation)
    {
        try { Apply(observation); }
        catch (Exception error) when (error is IOException or UnauthorizedAccessException)
        {
            _diagnostic($"{FileName} 无法更新（{error.GetType().Name}）。");
        }
    }

    private void Notify(IReadOnlyList<TencentConnectionSummary> changes)
    {
        if (changes.Count == 0 || StatusChanged is not { } handlers) return;
        foreach (Action<IReadOnlyList<TencentConnectionSummary>> handler in handlers.GetInvocationList())
        {
            try { handler(changes); }
            catch (Exception error) { _diagnostic($"文档连接状态订阅者处理失败（{error.GetType().Name}）。"); }
        }
    }

    private static TencentConnectionSummary ForDocument(Snapshot snapshot, TencentConnectionDocument document)
    {
        if (snapshot.Documents.TryGetValue(document.TaskId, out var row))
        {
            if (row.Document == document) return row;
            return new(document, snapshot.AccountId, snapshot.ProfileGeneration, TencentConnectionState.NotConnected,
                Reason: nameof(TencentConnectionInvalidation.DocumentChanged), LoginExpiresAt: snapshot.LoginExpiresAt);
        }
        return snapshot.ProfileReason is { } reason
            ? Invalidate(new(document, snapshot.AccountId, snapshot.ProfileGeneration, TencentConnectionState.NotConnected,
                LoginExpiresAt: snapshot.LoginExpiresAt), reason, snapshot.ProfileInvalidatedAt!.Value)
            : new(document, snapshot.AccountId, snapshot.ProfileGeneration, TencentConnectionState.NotConnected,
                LoginExpiresAt: snapshot.LoginExpiresAt);
    }

    private static TencentConnectionSummary Invalidate(TencentConnectionSummary row, TencentConnectionInvalidation reason, DateTimeOffset time) =>
        row with
        {
            State = reason switch
            {
                TencentConnectionInvalidation.DocumentChanged => TencentConnectionState.NotConnected,
                TencentConnectionInvalidation.AccessDenied => TencentConnectionState.AccessDenied,
                TencentConnectionInvalidation.ReadOnly => TencentConnectionState.ReadOnly,
                _ => TencentConnectionState.NeedsLogin
            },
            ConfirmedAt = time,
            Reason = reason.ToString()
        };

    private static string? CleanName(string? name) => string.IsNullOrWhiteSpace(name) ? null : name.Trim()[..Math.Min(name.Trim().Length, 200)];

    private static bool IsValid(Snapshot value) => value.Documents is not null &&
        (value.ProfileReason is null || value.ProfileInvalidatedAt is not null &&
            value.ProfileReason is TencentConnectionInvalidation.LoginExpired or TencentConnectionInvalidation.LoginCleared or
                TencentConnectionInvalidation.ProfileChanged or TencentConnectionInvalidation.AccountChanged) &&
        value.Documents.All(pair => pair.Value is { Document: { } document } row && document.TaskId == pair.Key &&
            document.ConfigRevision >= 0 && !string.IsNullOrEmpty(document.DocumentIdentity) &&
            TencentConnectionDocument.Normalize(document.DocumentIdentity) == document.DocumentIdentity &&
            Enum.IsDefined(row.State) && (row.LastDiagnostic is null || Enum.IsDefined(row.LastDiagnostic.Value)));

    internal static TencentConnectionEvent? FromWorker(JsonElement observation, TencentConnectionDocument? document, Guid? profileGeneration, DateTimeOffset now)
    {
        if (observation.ValueKind != JsonValueKind.Object) return null;
        string? Text(string name) => observation.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.String
            ? value.GetString() : null;
        DateTimeOffset? Time(string name) => DateTimeOffset.TryParse(Text(name), out var time) ? time : null;
        var authenticated = observation.TryGetProperty("authenticated", out var auth) && auth.ValueKind == JsonValueKind.True;
        var account = authenticated ? Text("accountId") : null;
        if (account is not { Length: 64 } || !account.All(Uri.IsHexDigit)) account = null;
        var invalidation = Text("invalidation") switch
        {
            "LoginExpired" => TencentConnectionInvalidation.LoginExpired,
            "LoginCleared" => TencentConnectionInvalidation.LoginCleared,
            "AccessDenied" => TencentConnectionInvalidation.AccessDenied,
            "ReadOnly" => TencentConnectionInvalidation.ReadOnly,
            _ => (TencentConnectionInvalidation?)null
        };
        var diagnostic = Text("diagnostic") switch
        {
            "Timeout" => TencentConnectionDiagnostic.Timeout,
            "NetworkError" => TencentConnectionDiagnostic.NetworkError,
            "PageIncomplete" => TencentConnectionDiagnostic.PageIncomplete,
            "Cancelled" => TencentConnectionDiagnostic.Cancelled,
            "Unavailable" => TencentConnectionDiagnostic.Unavailable,
            _ => (TencentConnectionDiagnostic?)null
        };
        var confirmed = authenticated && document is not null &&
            TencentConnectionDocument.Normalize(Text("documentIdentity")) == document.DocumentIdentity ? Time("editableConfirmedAt") : null;
        if (!authenticated && invalidation is null && diagnostic is null && profileGeneration is null) return null;
        return new(now, document, invalidation, diagnostic, profileGeneration, authenticated, account,
            authenticated ? Time("loginExpiresAt") : null, confirmed, Text("documentName"));
    }
}
