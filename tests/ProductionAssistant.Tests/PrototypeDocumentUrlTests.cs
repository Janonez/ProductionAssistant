using ProductionAssistant.Models;
using Xunit;

namespace ProductionAssistant.Tests;

public sealed class PrototypeDocumentUrlTests
{
    [Fact]
    public void Document_url_replaces_navigation_and_preserves_other_parameters()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&navigation=old&mode=compact",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&navigation=new&mode=compact", actual);
    }

    [Theory]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report&mode=compact", "https://prototype.production-assistant.local/index.html?route=daily-report&mode=compact&navigation=new")]
    [InlineData("https://prototype.production-assistant.local/index.html", "https://prototype.production-assistant.local/index.html?navigation=new")]
    public void Document_url_appends_navigation_when_missing(string source, string expected)
    {
        Assert.Equal(expected, PrototypeBridgeProtocol.BuildDocumentUrl(source, "new"));
    }

    [Fact]
    public void Document_url_keeps_first_navigation_position_and_removes_duplicates()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&navigation=old&view=compact&navigation=older&filter=active&navigation=oldest",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&navigation=new&view=compact&filter=active", actual);
    }

    [Theory]
    [InlineData("https://example.com/index.html?route=daily-report&navigation=old")]
    [InlineData("http://prototype.production-assistant.local/index.html?route=daily-report&navigation=old")]
    [InlineData("https://prototype.production-assistant.local/other.html?route=daily-report&navigation=old")]
    [InlineData("https://prototype.production-assistant.local:444/index.html?route=daily-report&navigation=old")]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("not a url")]
    public void Document_url_rejects_untrusted_sources(string? source)
    {
        Assert.Equal("https://prototype.production-assistant.local/index.html?navigation=new",
            PrototypeBridgeProtocol.BuildDocumentUrl(source, "new"));
    }

    [Fact]
    public void Document_url_escapes_load_id()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?route=daily-report&navigation=old",
            "a b&c");

        Assert.Equal("https://prototype.production-assistant.local/index.html?route=daily-report&navigation=a%20b%26c", actual);
    }

    [Fact]
    public void Document_url_preserves_original_query_encoding_and_parameter_order()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?q=a%20b+c%2Fd&route=daily-report&navigation=old&mode=compact",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?q=a%20b+c%2Fd&route=daily-report&navigation=new&mode=compact", actual);
    }

    [Theory]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report&navigation=old#frag", "https://prototype.production-assistant.local/index.html?route=daily-report&navigation=new")]
    [InlineData("https://prototype.production-assistant.local/index.html#frag?navigation=old", "https://prototype.production-assistant.local/index.html?navigation=new")]
    [InlineData("https://prototype.production-assistant.local/index.html?route=daily-report#frag", "https://prototype.production-assistant.local/index.html?route=daily-report&navigation=new")]
    public void Document_url_discards_fragment(string source, string expected)
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(source, "new");

        Assert.Equal(expected, actual);
        Assert.DoesNotContain("#", actual);
    }

    [Fact]
    public void Document_url_replaces_escaped_navigation_keys()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?navig%61tion=old&route=daily-report&navigation=older",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?navigation=new&route=daily-report", actual);
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
            "https://prototype.production-assistant.local/index.html?&flag&&empty=&navigation&route=daily-report&&",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?flag&empty=&navigation=new&route=daily-report", actual);
    }

    [Fact]
    public void Document_url_matches_navigation_keys_using_ordinal_comparison()
    {
        var actual = PrototypeBridgeProtocol.BuildDocumentUrl(
            "https://prototype.production-assistant.local/index.html?Navigation=keep&navigation=old&NAVIGATION=also&nav%69gation=older",
            "new");

        Assert.Equal("https://prototype.production-assistant.local/index.html?Navigation=keep&navigation=new&NAVIGATION=also", actual);
    }
}
