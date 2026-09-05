using System.Net;
using System.Text;
using System.Text.Json;
using ProductionAssistant.Models;
using ProductionAssistant.Services;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class MaterialInboundNotionFillServiceTests
{
    [Fact]
    public void Midnight_run_uses_the_previous_local_calendar_day()
    {
        var startedAt = new DateTimeOffset(new DateTime(2026, 9, 4, 0, 0, 0, DateTimeKind.Local));

        var businessDate = NotionFillTaskHandler.ResolveBusinessDate(startedAt);

        Assert.Equal(new DateOnly(2026, 9, 3), businessDate);
    }

    [Fact]
    public async Task Creates_only_the_fixed_material_inbound_properties()
    {
        var handler = new CaptureHandler();
        var http = new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") };
        var service = new MaterialInboundNotionFillService(http, new SchemaStub(),
            () => new NotionSettings { Token = "test-token" });
        var job = new NotionFillJob { TargetDataSourceId = "target-source" };
        var preview = new NotionFillPreview(
            new DailyMaterialInboundSummary(new DateOnly(2026, 9, 3), 9.425m, 3.15m), false, "可以新增");

        await service.CreateAsync(job, preview);

        using var document = JsonDocument.Parse(handler.Body);
        var root = document.RootElement;
        Assert.Equal("target-source", root.GetProperty("parent").GetProperty("data_source_id").GetString());
        Assert.Equal("none", root.GetProperty("template").GetProperty("type").GetString());
        var properties = root.GetProperty("properties");
        Assert.Equal(4, properties.EnumerateObject().Count());
        Assert.Equal("2026-09-03", properties.GetProperty("日期").GetProperty("date").GetProperty("start").GetString());
        Assert.Equal(9.425m, properties.GetProperty("板材").GetProperty("number").GetDecimal());
        Assert.Equal(3.15m, properties.GetProperty("型材").GetProperty("number").GetDecimal());
        Assert.Equal("2026-09-03 入库", properties.GetProperty("业务").GetProperty("title")[0]
            .GetProperty("text").GetProperty("content").GetString());
    }

    [Fact]
    public async Task Existing_date_does_not_send_a_create_request()
    {
        var handler = new CaptureHandler();
        var service = new MaterialInboundNotionFillService(
            new HttpClient(handler) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            new SchemaStub(),
            () => new NotionSettings { Token = "test-token" });
        var preview = new NotionFillPreview(
            new DailyMaterialInboundSummary(new DateOnly(2026, 9, 3), 1, 2), true, "已有记录");

        await service.CreateAsync(new NotionFillJob { TargetDataSourceId = "target-source" }, preview);

        Assert.Equal(0, handler.RequestCount);
    }

    [Fact]
    public async Task Preview_identifies_target_schema_failures_before_reading_93()
    {
        var service = new MaterialInboundNotionFillService(
            new HttpClient(new CaptureHandler()) { BaseAddress = new Uri("https://api.notion.com/v1/") },
            new FailingSchemaStub(),
            () => new NotionSettings { Token = "test-token" });

        var error = await Assert.ThrowsAsync<InvalidOperationException>(() => service.PreviewAsync(
            new NotionFillJob
            {
                BaseUrl = "https://internal.example.test",
                SourcePageUrl = "https://internal.example.test/inbound/summary.php",
                Username = "tester",
                EncryptedPassword = "configured-for-precondition",
                TargetDataSourceId = "target-source"
            },
            new DateOnly(2026, 9, 3)));

        Assert.Contains("检查 Notion 目标数据库结构失败", error.Message);
        Assert.Contains("测试结构错误", error.Message);
    }

    private sealed class CaptureHandler : HttpMessageHandler
    {
        public int RequestCount { get; private set; }
        public string Body { get; private set; } = string.Empty;

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request,
            CancellationToken cancellationToken)
        {
            RequestCount++;
            Body = request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken);
            return new(HttpStatusCode.OK)
            {
                Content = new StringContent("{\"id\":\"page-1\"}", Encoding.UTF8, "application/json")
            };
        }
    }

    private sealed class SchemaStub : INotionImportService
    {
        public Task<NotionSchemaResult> GetSchemaAsync(string token, string dataSourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult(new NotionSchemaResult(true, string.Empty,
            [
                new("业务", "title", Id: "title"),
                new("日期", "date", Id: "date"),
                new("板材", "number", Id: "plate"),
                new("型材", "number", Id: "section")
            ]));

        public Task<NotionDiscoveryResult> DiscoverAsync(string token, string rootPageId, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> TestConnectionAsync(NotionSettings settings, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ImportAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportPlanResult> PrepareImportAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionExistingDataResult> HasExistingDataAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ExecuteImportAsync(NotionImportPlanResult plan, bool overwriteExisting, IProgress<NotionImportProgress>? progress = null, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ImportWeldHierarchyAsync(NotionImportRequest request, IProgress<NotionImportProgress>? progress = null, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<ProductionMessageImportResult> ImportProductionMessagesAsync(ProductionMessageImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
    }

    private sealed class FailingSchemaStub : INotionImportService
    {
        public Task<NotionSchemaResult> GetSchemaAsync(string token, string dataSourceId, CancellationToken cancellationToken = default) =>
            Task.FromResult(new NotionSchemaResult(false, "测试结构错误", []));

        public Task<NotionDiscoveryResult> DiscoverAsync(string token, string rootPageId, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> TestConnectionAsync(NotionSettings settings, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ImportAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportPlanResult> PrepareImportAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionExistingDataResult> HasExistingDataAsync(NotionImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ExecuteImportAsync(NotionImportPlanResult plan, bool overwriteExisting, IProgress<NotionImportProgress>? progress = null, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<NotionImportResult> ImportWeldHierarchyAsync(NotionImportRequest request, IProgress<NotionImportProgress>? progress = null, CancellationToken cancellationToken = default) => throw new NotSupportedException();
        public Task<ProductionMessageImportResult> ImportProductionMessagesAsync(ProductionMessageImportRequest request, CancellationToken cancellationToken = default) => throw new NotSupportedException();
    }
}
