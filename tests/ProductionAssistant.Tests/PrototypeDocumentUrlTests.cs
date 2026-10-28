using ProductionAssistant.Models;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class PrototypeDocumentUrlTests
{
    [Fact]
    public void Document_url_replaces_load_id_and_preserves_other_parameters()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&loadId=old&mode=compact",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&loadId=new&mode=compact", actual);
    }

    [Theory]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report&mode=compact", "https://prototype.production-assistant.local/index.html?route=daily-report&mode=compact&loadId=new")]
    [InlineData("https://prototype.production-assistant.local/index.html", "https://prototype.production-assistant.local/index.html?loadId=new")]
    public void Document_url_appends_load_id_when_missing(string source, string expected)
    {
        Assert.Equal(expected, PrototypeBridgeProtocol.BuildDocumentUrl(source, "new"));
    }

    [Fact]
    public void Document_url_keeps_first_load_id_position_and_removes_duplicates()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&loadId=old&view=compact&loadId=older&filter=active&loadId=oldest",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&loadId=new&view=compact&filter=active", actual);
    }

    [Theory]
    [InlineData("https://example.com/index.html?route=daily-report&loadId=old")]
    [InlineData("http://prototype.production-assistant.local/index.html?route=daily-report&loadId=old")]
    [InlineData("https://prototype.production-assistant.local/other.html?route=daily-report&loadId=old")]
    [InlineData("https://prototype.production-assistant.local:444/index.html?route=daily-report&loadId=old")]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("not a url")]
    public void Document_url_rejects_untrusted_sources(string? source)
    {
        Assert.Equal("https://prototype.production-assistant.local/index.html?loadId=new",
            PrototypeBridgeProtocol.BuildDocumentUrl(source, "new"));
    }

    [Fact]
    public void Document_url_escapes_load_id()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&loadId=old",
            "a b&c");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&loadId=a%20b%26c", actual);
    }

    [Fact]
    public void Document_url_preserves_original_query_encoding_and_parameter_order()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?q=a%20b+c%2Fd&route=daily-report&loadId=old&mode=compact",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?q=a%20b+c%2Fd&route=daily-report&loadId=new&mode=compact", actual);
    }

    [Theory]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report&loadId=old#frag", "https://prototype.production-assistant.local/index.html?route=daily-report&loadId=new")]
    [InlineData("https://prototype.production-assistant.local/index.html#frag?loadId=old", "https://prototype.production-assistant.local/index.html?loadId=new")]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report#frag", "https://prototype.production-assistant.local/index.html?route=daily-report&loadId=new")]
    public void Document_url_discards_fragment(string source, string expected)
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(source, "new");

        Assert.Equal(expected, actual);
        Assert.DoesNotContain("#", actual);
    }

    [Fact]
    public void Document_url_replaces_escaped_load_id_keys()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?load%49d=old&route=daily-report&loadId=older",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?loadId=new&route=daily-report", actual);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Document_url_rejects_blank_load_id(string? loadId)
    {
        Assert.ThrowsAny<ArgumentException>(() => PrototypeBridgeProtocol.BuildDocumentUrl(null, loadId!));
    }

    [Fact]
    public void Document_url_skips_empty_segments_and_preserves_parameters_without_values()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?&flag&&empty=&loadId&route=daily-report&&",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?flag&empty=&loadId=new&route=daily-report", actual);
    }

    [Fact]
    public void Document_url_matches_load_id_keys_using_ordinal_comparison()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?LoadId=keep&loadId=old&LOADID=also&load%49d=older",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?LoadId=keep&loadId=new&LOADID=also", actual);
    }
}
