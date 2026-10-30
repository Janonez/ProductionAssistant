using Xunit;

namespace ProductionAssistant.Tests;

public sealed class OperationRegistryTests
{
    [Fact]
    public void Begin_returns_uncancelled_tokens_and_cancel_by_id_only_cancels_the_target()
    {
        var registry = new OperationRegistry();
        using var first = registry.Begin("first", "production.parse", false);
        using var second = registry.Begin("second", "production.parse", false);

        Assert.True(first.Token.CanBeCanceled);
        Assert.False(first.Token.IsCancellationRequested);
        Assert.False(second.Token.IsCancellationRequested);
        Assert.True(registry.Cancel("first"));
        Assert.True(first.Token.IsCancellationRequested);
        Assert.False(second.Token.IsCancellationRequested);
        Assert.False(registry.Cancel("missing"));
        Assert.False(second.Token.IsCancellationRequested);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    public void Cancel_without_a_target_uses_the_latest_remaining_request(string? targetId)
    {
        var registry = new OperationRegistry();
        using var earlier = registry.Begin("earlier", "production.parse", false);
        using var latest = registry.Begin("latest", "weld.generate", false);

        Assert.True(registry.Cancel(targetId));
        Assert.True(latest.Token.IsCancellationRequested);
        Assert.False(earlier.Token.IsCancellationRequested);

        latest.Dispose();
        Assert.True(registry.Cancel(targetId));
        Assert.True(earlier.Token.IsCancellationRequested);
    }

    [Fact]
    public void Exclusive_operations_reject_the_same_operation_until_the_lease_is_released()
    {
        var registry = new OperationRegistry();
        using var first = registry.Begin("first", "production.write", true);

        var error = Assert.Throws<InvalidOperationException>(() => registry.Begin("second", "production.write", true));
        Assert.Equal("该操作正在进行中，请等待完成。", error.Message);

        first.Dispose();
        using var next = registry.Begin("second", "production.write", true);
        Assert.False(next.Token.IsCancellationRequested);
    }

    [Fact]
    public void Different_exclusive_operations_can_run_together()
    {
        var registry = new OperationRegistry();
        using var first = registry.Begin("first", "production.write", true);
        using var second = registry.Begin("second", "weld.write", true);

        Assert.False(first.Token.IsCancellationRequested);
        Assert.False(second.Token.IsCancellationRequested);
    }

    [Fact]
    public void Nonexclusive_requests_with_the_same_operation_can_run_together()
    {
        var registry = new OperationRegistry();
        using var first = registry.Begin("first", "production.write", false);
        using var second = registry.Begin("second", "production.write", false);

        Assert.False(first.Token.IsCancellationRequested);
        Assert.False(second.Token.IsCancellationRequested);
    }

    [Fact]
    public void Disposed_requests_cannot_be_cancelled_and_repeated_dispose_is_safe()
    {
        var registry = new OperationRegistry();
        var lease = registry.Begin("first", "production.parse", false);

        lease.Dispose();
        lease.Dispose();
        Assert.False(registry.Cancel("first"));
        Assert.False(registry.Cancel(null));
        Assert.False(registry.Cancel(""));
    }

    [Fact]
    public void Duplicate_inflight_request_ids_are_rejected()
    {
        var registry = new OperationRegistry();
        using var first = registry.Begin("same", "production.parse", false);

        var error = Assert.Throws<InvalidOperationException>(() => registry.Begin("same", "weld.generate", false));
        Assert.Equal("请求标识重复。", error.Message);
        Assert.False(first.Token.IsCancellationRequested);
    }

    [Fact]
    public void Disposing_an_old_lease_does_not_remove_a_reused_request_id()
    {
        var registry = new OperationRegistry();
        using var old = registry.Begin("same", "production.parse", false);
        old.Dispose();
        using var current = registry.Begin("same", "production.parse", false);

        old.Dispose();
        Assert.True(registry.Cancel("same"));
        Assert.True(current.Token.IsCancellationRequested);
    }

    [Fact]
    public void Cancellation_callbacks_can_release_a_lease_and_register_another_request()
    {
        var registry = new OperationRegistry();
        using var original = registry.Begin("original", "production.parse", false);
        OperationRegistry.Lease? replacement = null;
        using var registration = original.Token.Register(() =>
        {
            original.Dispose();
            replacement = registry.Begin("replacement", "production.parse", false);
        });
        try
        {
            Assert.True(registry.Cancel("original"));
            Assert.NotNull(replacement);
            Assert.False(replacement.Token.IsCancellationRequested);
            Assert.False(registry.Cancel("original"));
        }
        finally { replacement?.Dispose(); }
    }
}
