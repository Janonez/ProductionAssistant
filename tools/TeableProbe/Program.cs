using System.Diagnostics;
using System.Text;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;

// 默认隔离于 Development；正式环境检查必须显式指定，避免误改生产配置。
var environment = "Development";
if (args.Length >= 2 && args[0] == "--environment")
{
    environment = args[1];
    if (environment is not ("Development" or "Production")) return 2;
    args = args[2..];
}
Environment.SetEnvironmentVariable("DOTNET_ENVIRONMENT", environment);
try
{
    if (args.Length == 1 && args[0] is "disable-query" or "disable-business")
        throw new InvalidOperationException("v1.7 起固定使用 Teable；回退须恢复旧软件和配置备份。");
    if (args.Length == 3 && args[0] == "business-smoke")
        return await BusinessSmoke.RunAsync(args[1], args[2]);
    if (args.Length == 2 && args[0] == "import-business-bindings")
    {
        var mapping = TeableQuerySettingsStore.Load();
        var bindings = BusinessDatabaseSettingsStore.Import(args[1], mapping);
        var store = new TeableBusinessStore(mapping);
        foreach (var target in bindings.Targets)
        {
            var schema = await store.GetSchemaAsync(target.Id);
            if (!schema.Properties.Any(field => field.Name == target.TitleProperty && field.Type == "title") ||
                !schema.Properties.Any(field => field.Name == target.DateProperty && field.Type == "date"))
                throw new InvalidOperationException("业务绑定与真实字段不一致。");
        }
        if (bindings.Targets.Count == 0) throw new InvalidOperationException("没有可迁移的业务绑定。");
        BusinessDatabaseSettingsStore.Save(bindings);
        Console.WriteLine($"已验证并导入 {bindings.Targets.Count} 个业务绑定；未复制 Notion 凭据。");
        return 0;
    }
    if (args.Length == 1 && args[0] is "business-check" or "enable-business" or "disable-business")
    {
        var mapping = TeableQuerySettingsStore.Load();
        if (args[0] != "disable-business")
        {
            if (!File.Exists(BusinessDatabaseSettingsStore.FilePath)) throw new InvalidOperationException("请先导入业务绑定。");
            var store = new TeableBusinessStore(mapping);
            foreach (var source in store.Sources)
            {
                await store.GetSchemaAsync(source.Id);
                Console.WriteLine($"{source.Name}：业务字段及关联检查通过，{(await store.QueryAsync(source.Id, null)).Count} 条。");
            }
        }
        if (args[0] != "business-check")
        {
            TeableQuerySettingsStore.Save(mapping with { WritesEnabled = args[0] == "enable-business", Enabled = args[0] == "enable-business" || mapping.Enabled });
            Console.WriteLine("兼容字段已保存；应用固定使用 Teable。");
        }
        return 0;
    }
    if (args.Length is 2 or 3 && args[0] == "import-query-map")
    {
        var mapping = TeableQuerySettingsStore.Import(args[1], args.Length == 3 ? args[2] : null);
        var previous = TeableQuerySettingsStore.Load();
        mapping = mapping with { Enabled = previous.Enabled, WritesEnabled = previous.WritesEnabled };
        var provider = new TeableDatabaseQueryProvider(mapping);
        foreach (var source in provider.GetSources()) await provider.GetSchemaAsync(source.Id);
        TeableQuerySettingsStore.Save(mapping);
        Console.WriteLine($"已验证并导入 {mapping.Sources.Count} 张表映射；保留兼容字段，应用固定使用 Teable。");
        return 0;
    }
    if (args.Length == 1 && args[0] is "query-check" or "enable-query" or "disable-query")
    {
        var mapping = TeableQuerySettingsStore.Load();
        if (args[0] != "disable-query")
        {
            if (mapping.Sources.Count == 0) throw new InvalidOperationException("请先导入业务查询映射。");
            var provider = new TeableDatabaseQueryProvider(mapping);
            foreach (var source in provider.GetSources())
            {
                var table = mapping.Sources.Single(item => item.Id == source.Id);
                var result = await provider.QueryDatasetAsync(source.Id, table.TableId);
                if (!result.Succeeded) throw new InvalidOperationException(result.Message);
                Console.WriteLine($"{source.Name}：{result.Records.Count} 条，{result.RequestCount} 次请求。");
                foreach (var view in table.Views ?? [])
                {
                    var viewResult = await provider.QueryDatasetAsync(source.Id, view.Id);
                    if (!viewResult.Succeeded) throw new InvalidOperationException(viewResult.Message);
                    Console.WriteLine($"  {view.Name}：{viewResult.Records.Count} 条。");
                }
            }
        }
        if (args[0] != "query-check")
        {
            TeableQuerySettingsStore.Save(mapping with { Enabled = args[0] == "enable-query", WritesEnabled = args[0] == "enable-query" && mapping.WritesEnabled });
            Console.WriteLine("兼容字段已保存；应用固定使用 Teable。");
        }
        return 0;
    }
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
        Console.WriteLine("用法: [--environment Development|Production] configure [实例地址 表ID] | check | write <fields.json> | import-query-map <schema-state.json> [views-state.json] | query-check | enable-query | import-business-bindings <notion-settings.json> | business-check | enable-business | business-smoke <scratch-mapping.json> <notion-settings.json>。write 和 business-smoke 会创建真实记录。");
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
