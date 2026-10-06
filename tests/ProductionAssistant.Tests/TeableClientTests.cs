using System.Net;
using System.Text.Json;
using System.Text.Json.Nodes;
using ProductionAssistant.Services;
using Xunit;

public sealed class TeableClientTests
{
    [Theory]
    [InlineData("https://example.test")]
    [InlineData("https://example.test/api/")]
    public async Task Read_uses_bearer_and_explicit_page(string url)
    {
        using var client = new TeableClient(url, "secret", new Handler(request =>
        {
            Assert.Equal("Bearer secret", request.Headers.Authorization!.ToString());
            Assert.Equal("/api/table/tblTest/record?fieldKeyType=id&take=10&skip=20", request.RequestUri!.PathAndQuery);
            return new(HttpStatusCode.OK) { Content = new StringContent("{\"records\":[]}") };
        }));
        Assert.Empty((await client.ReadRecordsAsync("tblTest", 10, 20))["records"]!.AsArray());
    }

    [Fact]
    public async Task Write_keeps_field_values_and_does_not_retry_or_expose_error_body()
    {
        var calls = 0;
        using var client = new TeableClient("https://example.test", "secret", new Handler(request =>
        {
            calls++;
            Assert.Equal(HttpMethod.Post, request.Method);
            var body = JsonNode.Parse(request.Content!.ReadAsStringAsync().GetAwaiter().GetResult())!;
            Assert.False(body["typecast"]!.GetValue<bool>());
            Assert.Equal("id", body["fieldKeyType"]!.GetValue<string>());
            Assert.Equal(12, body["records"]![0]!["fields"]!["fldQuantity"]!.GetValue<int>());
            return new(HttpStatusCode.ServiceUnavailable) { Content = new StringContent("secret business data") };
        }));
        var error = await Assert.ThrowsAsync<HttpRequestException>(() =>
            client.CreateRecordAsync("tblTest", new JsonObject { ["fldQuantity"] = 12 }));
        Assert.Equal(1, calls);
        Assert.DoesNotContain("secret", error.ToString());
        Assert.Equal(HttpStatusCode.ServiceUnavailable, error.StatusCode);
    }

    [Theory]
    [InlineData("http://example.test")]
    [InlineData("https://user:secret@example.test")]
    [InlineData("https://example.test?token=secret")]
    public void Unsafe_urls_are_rejected(string url) =>
        Assert.Throws<ArgumentException>(() => new TeableClient(url, "secret"));

    [Fact]
    public void Token_is_excluded_from_serialized_settings()
    {
        Assert.DoesNotContain("plain-secret", JsonSerializer.Serialize(new TeableSettings { Token = "plain-secret" }));
    }

    [Fact]
    public async Task Readback_uses_exact_record_id_and_rejects_path_injection()
    {
        using var client = new TeableClient("https://example.test", "secret", new Handler(request =>
        {
            Assert.Equal("/api/table/tblTest/record/recTest?fieldKeyType=id", request.RequestUri!.PathAndQuery);
            return new(HttpStatusCode.OK) { Content = new StringContent("{\"id\":\"recTest\",\"fields\":{}}") };
        }));
        Assert.Equal("recTest", (await client.ReadRecordAsync("tblTest", "recTest"))["id"]!.GetValue<string>());
        await Assert.ThrowsAsync<ArgumentException>(() => client.ReadRecordsAsync("tblTest/../../other"));
    }

    private sealed class Handler(Func<HttpRequestMessage, HttpResponseMessage> send) : HttpMessageHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
            => Task.FromResult(send(request));
    }
}
