using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace ProductionAssistant.Services;

public sealed class AtomicJsonStore<T>(string path, Func<T> defaults, Func<T, bool> isValid, Action<string> diagnostic)
    where T : class
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { WriteIndented = true };
    private readonly string _path = Path.GetFullPath(path);

    public T Read() => WithLock(() => Load(forUpdate: false));

    // Keep validation, revision comparison and replacement in one cross-process transaction.
    public TResult Update<TResult>(Func<T, (T? Replacement, TResult Result)> update) => WithLock(() =>
    {
        var (replacement, result) = update(Load(forUpdate: true));
        if (replacement is not null)
        {
            if (!isValid(replacement)) throw new ArgumentException("配置结构无效。");
            Write(replacement);
        }
        return result;
    });

    private TResult WithLock<TResult>(Func<TResult> action)
    {
        var identity = OperatingSystem.IsWindows() ? _path.ToUpperInvariant() : _path;
        var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(identity)));
        using var mutex = new Mutex(false, "ProductionAssistant-AtomicJson-" + hash);
        try
        {
            if (!mutex.WaitOne(TimeSpan.FromSeconds(5))) throw new IOException("配置文件正在使用，请稍后重试。");
        }
        catch (AbandonedMutexException) { }
        try { return action(); }
        finally { mutex.ReleaseMutex(); }
    }

    private T Load(bool forUpdate)
    {
        try
        {
            using var stream = File.OpenRead(_path);
            var value = JsonSerializer.Deserialize<T>(stream, JsonOptions);
            if (value is null || !isValid(value)) throw new JsonException("配置结构无效。");
            return value;
        }
        catch (FileNotFoundException) { return defaults(); }
        catch (DirectoryNotFoundException) { return defaults(); }
        catch (JsonException)
        {
            var backup = $"{_path}.corrupt-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}.bak";
            try
            {
                File.Move(_path, backup);
                diagnostic($"{Path.GetFileName(_path)} 配置损坏，使用默认值。备份：{Path.GetFileName(backup)}");
            }
            catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
            {
                diagnostic($"{Path.GetFileName(_path)} 配置损坏，无法备份（{ex.GetType().Name}）。");
                if (forUpdate) throw new IOException("无法备份损坏的配置，保存失败。", ex);
            }
            return defaults();
        }
    }

    private void Write(T value)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_path)!);
        var temporary = $"{_path}.{Guid.NewGuid():N}.tmp";
        try
        {
            using (var stream = new FileStream(temporary, FileMode.CreateNew, FileAccess.Write, FileShare.None))
            {
                JsonSerializer.Serialize(stream, value, JsonOptions);
                stream.Flush(flushToDisk: true);
            }
            File.Move(temporary, _path, overwrite: true);
        }
        finally
        {
            File.Delete(temporary);
        }
    }
}
