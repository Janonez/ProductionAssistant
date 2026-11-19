using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class TencentConnectionSummaryTests : IDisposable
{
    private readonly string _folder = Path.Combine(Path.GetTempPath(), "TencentConnectionSummaryTests", Guid.NewGuid().ToString("N"));
    private static readonly TencentConnectionDocument First = new("first", 7, "https://docs.qq.com/sheet/one");
    private static readonly TencentConnectionDocument Second = new("second", 3, "https://docs.qq.com/sheet/two");
    private static readonly DateTimeOffset Time = DateTimeOffset.Parse("2026-11-18T03:00:00Z");
    private static readonly string Account = new('a', 64);

    [Theory]
    [InlineData(TencentConnectionDiagnostic.Timeout)]
    [InlineData(TencentConnectionDiagnostic.NetworkError)]
    [InlineData(TencentConnectionDiagnostic.PageIncomplete)]
    [InlineData(TencentConnectionDiagnostic.Cancelled)]
    public void Diagnostics_keep_the_last_confirmation_without_publishing_a_state_change(TencentConnectionDiagnostic reason)
    {
        var store = NewStore();
        Confirm(store, First);
        var changed = 0;
        store.StatusChanged += _ => changed++;

        store.Apply(new(Time.AddMinutes(1), First, Diagnostic: reason));

        var actual = NewStore().Read(First);
        Assert.Equal(TencentConnectionState.Connected, actual.State);
        Assert.Equal(Time, actual.ConfirmedAt);
        Assert.Equal("Confirmed", actual.Reason);
        Assert.Equal(reason, actual.LastDiagnostic);
        Assert.Equal(Time.AddMinutes(1), actual.LastDiagnosticAt);
        Assert.Equal(0, changed);
    }

    [Theory]
    [InlineData(TencentConnectionInvalidation.AccessDenied, TencentConnectionState.AccessDenied, false)]
    [InlineData(TencentConnectionInvalidation.ReadOnly, TencentConnectionState.ReadOnly, false)]
    [InlineData(TencentConnectionInvalidation.DocumentChanged, TencentConnectionState.NotConnected, false)]
    [InlineData(TencentConnectionInvalidation.LoginExpired, TencentConnectionState.NeedsLogin, true)]
    [InlineData(TencentConnectionInvalidation.LoginCleared, TencentConnectionState.NeedsLogin, true)]
    public void Explicit_events_update_the_affected_state_in_one_notification(TencentConnectionInvalidation reason, TencentConnectionState expected, bool shared)
    {
        var store = NewStore();
        Confirm(store, First);
        Confirm(store, Second);
        var notifications = new List<IReadOnlyList<TencentConnectionSummary>>();
        store.StatusChanged += notifications.Add;

        store.Apply(new(Time.AddMinutes(5), First, reason));

        Assert.Equal(shared ? 2 : 1, Assert.Single(notifications).Count);
        Assert.Equal(expected, NewStore().Read(First).State);
        Assert.Equal(reason.ToString(), NewStore().Read(First).Reason);
        Assert.Equal(shared ? expected : TencentConnectionState.Connected, NewStore().Read(Second).State);
    }

    [Fact]
    public void Account_change_invalidates_all_existing_connections_even_if_the_new_account_can_edit()
    {
        var store = NewStore();
        Confirm(store, First);
        Confirm(store, Second);
        var next = Time.AddMinutes(5);
        var account = new string('b', 64);
        store.Apply(new(next, First, AuthenticationConfirmed: true, AccountId: account, EditableConfirmedAt: next));

        Assert.All(new[] { First, Second }, document =>
        {
            var summary = NewStore().Read(document);
            Assert.Equal(TencentConnectionState.NeedsLogin, summary.State);
            Assert.Equal("AccountChanged", summary.Reason);
            Assert.Equal(account, summary.AccountId);
        });

        store.Apply(new(next, First, AuthenticationConfirmed: true, AccountId: account, EditableConfirmedAt: next));
        Assert.Equal(TencentConnectionState.Connected, NewStore().Read(First).State);
        Assert.Equal(TencentConnectionState.NeedsLogin, NewStore().Read(Second).State);
    }

    [Fact]
    public void Profile_replacement_is_detected_on_read_but_a_new_store_instance_keeps_the_same_generation()
    {
        var profile = Path.Combine(_folder, "tencent-sheet-profile");
        Directory.CreateDirectory(profile);
        var store = NewStore();
        var generation = store.ProfileGeneration(create: true);
        store.Apply(new(Time, First, ProfileGeneration: generation, AuthenticationConfirmed: true, AccountId: Account, EditableConfirmedAt: Time));
        Confirm(store, Second);
        Assert.Equal(generation, NewStore().Read(First).ProfileGeneration);
        Assert.Equal(TencentConnectionState.Connected, NewStore().Read(First).State);

        File.WriteAllText(Path.Combine(profile, ".metis-generation"), Guid.NewGuid().ToString("N"));

        Assert.Equal("ProfileChanged", NewStore().Read(First).Reason);
        Assert.Equal(TencentConnectionState.NeedsLogin, NewStore().Read(Second).State);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("{")]
    [InlineData("{\"documents\":{\"first\":null}}")]
    public void Missing_or_corrupt_file_returns_not_connected_and_records_a_diagnostic(string? contents)
    {
        Directory.CreateDirectory(_folder);
        if (contents is not null) File.WriteAllText(Path.Combine(_folder, TencentConnectionSummaryStore.FileName), contents);
        var diagnostics = new List<string>();
        var store = new TencentConnectionSummaryStore(_folder, diagnostics.Add);

        Assert.Equal(TencentConnectionState.NotConnected, store.Read(First).State);
        Assert.Single(diagnostics);
        Confirm(store, First);
        Assert.Equal(TencentConnectionState.Connected, NewStore().Read(First).State);
    }

    [Fact]
    public void Legacy_import_keeps_confirmation_and_cannot_overwrite_newer_evidence()
    {
        var store = NewStore();
        var entries = new[] { new TencentLegacyConnection(First.TaskId, First.ConfigRevision, Time, "日报"),
            new TencentLegacyConnection(Second.TaskId, Second.ConfigRevision - 1, Time, null) };
        store.Apply(new(Time.AddMinutes(1), First, Diagnostic: TencentConnectionDiagnostic.NetworkError));
        store.ImportLegacy(entries, [First, Second]);

        var imported = NewStore().Read(First);
        Assert.Equal(TencentConnectionState.Connected, imported.State);
        Assert.Equal(Time, imported.ConfirmedAt);
        Assert.Equal("日报", imported.DocumentName);
        Assert.Equal(TencentConnectionDiagnostic.NetworkError, imported.LastDiagnostic);
        Assert.Equal(TencentConnectionState.NotConnected, NewStore().Read(Second).State);

        store.Apply(new(Time.AddMinutes(1), First, TencentConnectionInvalidation.LoginCleared));
        store.ImportLegacy(entries, [First, Second]);
        Assert.Equal(TencentConnectionState.NeedsLogin, NewStore().Read(First).State);
        Assert.Equal("LoginCleared", NewStore().Read(First).Reason);
    }

    [Fact]
    public void Document_identity_is_normalized_and_does_not_depend_on_other_revisions()
    {
        var job = JsonNode.Parse("""{"id":"first","configRevision":7,"jobRevision":21,"config":{"documentUrl":"https://DOCS.QQ.COM/sheet/one/?tab=1#range"}}""")!.AsObject();
        var document = TencentConnectionDocument.FromJob(job);
        Assert.Equal(First, document);
        var store = NewStore();
        Confirm(store, First);
        job["jobRevision"] = 22;
        Assert.Equal(TencentConnectionState.Connected, store.Read(TencentConnectionDocument.FromJob(job)!).State);
        job["configRevision"] = 8;
        job["config"]!["documentUrl"] = "https://docs.qq.com/sheet/new";
        Assert.Equal("DocumentChanged", store.Read(TencentConnectionDocument.FromJob(job)!).Reason);
    }

    [Fact]
    public void Worker_observation_reads_only_allowed_fields_and_records_nullable_expiry()
    {
        var store = NewStore();
        var expires = Time.AddDays(2);
        var raw = JsonSerializer.SerializeToElement(new { authenticated = true, accountId = Account,
            documentIdentity = First.DocumentIdentity, editableConfirmedAt = Time, loginExpiresAt = expires, cookie = "secret-fixture" });
        store.Apply(TencentConnectionSummaryStore.FromWorker(raw, First, null, Time)!);
        Assert.Equal(expires, NewStore().Read(First).LoginExpiresAt);
        Assert.DoesNotContain("secret-fixture", File.ReadAllText(Path.Combine(_folder, TencentConnectionSummaryStore.FileName)));

        var sessionCookie = JsonSerializer.SerializeToElement(new { authenticated = true, accountId = Account });
        store.Apply(TencentConnectionSummaryStore.FromWorker(sessionCookie, First, null, Time.AddMinutes(1))!);
        Assert.Null(NewStore().Read(First).LoginExpiresAt);
        Assert.Equal(TencentConnectionState.Connected, NewStore().Read(First).State);
    }

    [Theory]
    [InlineData("write")]
    [InlineData("background")]
    public async Task Fill_failures_from_both_triggers_publish_to_the_same_store_before_preserving_the_write_guard(string operation)
    {
        Directory.CreateDirectory(_folder);
        var fixture = Path.Combine(_folder, "worker.cjs");
        await File.WriteAllTextAsync(fixture, """
            const input = require('node:readline').createInterface({input: process.stdin});
            input.on('line', line => {
              const request = JSON.parse(line);
              if (!['write', 'background'].includes(request.operation)) process.exit(1);
              console.log(JSON.stringify({ok:false, browserOpen:false, phase:'check', completed:[], uncertainAddress:null,
                code:'WritePreflightUnconfirmed', error:'fixture stopped before writing',
                connection:{invalidation:'LoginExpired'}}));
            });
            """);
        var store = NewStore();
        Confirm(store, First);
        Confirm(store, Second);
        await using var worker = new TencentSheetService(_folder, fixture, "");
        var request = new JsonObject { ["operation"] = operation, ["jobId"] = First.TaskId, ["configRevision"] = First.ConfigRevision,
            ["config"] = new JsonObject { ["documentUrl"] = First.DocumentIdentity } };

        await Assert.ThrowsAsync<TencentSheetPreflightException>(() => worker.CallAsync(request));

        Assert.Equal("LoginExpired", NewStore().Read(First).Reason);
        Assert.Equal(TencentConnectionState.NeedsLogin, NewStore().Read(Second).State);
    }

    private TencentConnectionSummaryStore NewStore() => new(_folder, _ => { });

    private static void Confirm(TencentConnectionSummaryStore store, TencentConnectionDocument document) =>
        store.Apply(new(Time, document, AuthenticationConfirmed: true, AccountId: Account, EditableConfirmedAt: Time));

    public void Dispose()
    {
        if (Directory.Exists(_folder)) Directory.Delete(_folder, recursive: true);
    }
}
