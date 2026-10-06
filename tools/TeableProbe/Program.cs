using System.Diagnostics;
using System.Text;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;

// 本分支的独立 API 验收入口：configure 保存凭据，check 只读，write 创建后按 ID 回读。
// 使用 Development 配置，不启动桌面应用，也不切换现有 Notion 业务执行路径。
Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT", "Development");
try
{
    if (args.Length is 1 or 3 && args[0] == "configure")
    {
        if (args.Length == 1) Console.Write("Teable 实例地址: ");
        var server = args.Length == 3 ? args[1] : Console.ReadLine()?.Trim() ?? "";
        if (args.Length == 1) Console.Write("测试表 ID (tbl...): ");
        var table = args.Length == 3 ? args[2] : Console.ReadLine()?.Trim() ?? "";
        Console.Write("API Token（输入隐藏）: ");
        var token = new StringBuilder();
        while (true)
        {
            var key = Console.ReadKey(intercept: true);
            if (key.Key == ConsoleKey.Enter) break;
            if (key.Key == ConsoleKey.Backspace) { if (token.Length > 0) token.Length--; }
            else if (!char.IsControl(key.KeyChar)) token.Append(key.KeyChar);
        }
        Console.WriteLine();
        TeableSettingsStore.Save(new() { ServerUrl = server, TableId = table, Token = token.ToString() });
        Console.WriteLine($"已用 Windows DPAPI 保存至 {TeableSettingsStore.FilePath}");
        return 0;
    }
    if (!(args.Length == 1 && args[0] == "check") && !(args.Length == 2 && args[0] == "write"))
    {
        Console.WriteLine("用法: configure [实例地址 表ID] | check | write <fields.json>。write 会创建一条真实记录，不自动重试或删除。");
        return 2;
    }
    var settings = TeableSettingsStore.Load();
    using var client = new TeableClient(settings.ServerUrl, settings.Token);
    var timer = Stopwatch.StartNew();
    var data = await client.ReadRecordsAsync(settings.TableId);
    if (data["records"] is not JsonArray records) throw new InvalidOperationException("响应缺少 records 数组。");
    Console.WriteLine($"直连读取成功：{timer.ElapsedMilliseconds} ms，抽样 {records.Count} 条记录；未输出业务数据。");
    if (args[0] == "write")
    {
        // 只写用户指定的测试字段；保留记录 ID 供核对，工具不自动重试或删除测试记录。
        var fields = JsonNode.Parse(await File.ReadAllTextAsync(args[1])) as JsonObject
            ?? throw new ArgumentException("fields.json 必须是以字段 ID 为键的 JSON 对象。");
        var created = await client.CreateRecordAsync(settings.TableId, fields);
        var id = created["records"]?[0]?["id"]?.GetValue<string>()
            ?? throw new InvalidOperationException("写入响应缺少记录 ID，请到表内核对，不要直接重试。");
        Console.WriteLine($"已创建测试记录 {id}；开始回读。");
        var readBack = await client.ReadRecordAsync(settings.TableId, id);
        if (readBack["id"]?.GetValue<string>() != id || readBack["fields"] is not JsonObject actual ||
            fields.Any(field => !JsonNode.DeepEquals(field.Value, actual[field.Key])))
            throw new InvalidOperationException("测试记录回读值不一致，请在表内检查该记录。");
        Console.WriteLine("写入及字段回读校验通过。测试记录保留在表内，请按打印的 ID 手动清理。");
    }
    return 0;
}
catch (HttpRequestException error)
{
    Console.Error.WriteLine(error.StatusCode is { } status ? $"Teable HTTP {(int)status}：检查地址、权限和表 ID。" :
        "Teable 直连失败：检查 DNS、TLS 和网络可达性。若已尝试写入，请先核对表内记录再重试。");
    return 1;
}
catch (OperationCanceledException)
{
    Console.Error.WriteLine("Teable 请求超时或取消。若已尝试写入，请先核对表内记录再重试。");
    return 1;
}
catch (Exception)
{
    Console.Error.WriteLine("配置、响应或回读校验失败。检查配置及字段 JSON；若已尝试写入，请先到测试表核对，避免重复写入。");
    return 1;
}
