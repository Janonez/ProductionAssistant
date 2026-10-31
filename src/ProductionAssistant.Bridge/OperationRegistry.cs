namespace ProductionAssistant;

internal sealed class OperationRegistry
{
    private readonly object _gate = new();
    private readonly Dictionary<string, Lease> _requests = new(StringComparer.Ordinal);
    private readonly List<Lease> _order = [];

    internal Lease Begin(string id, string operation, bool exclusive)
    {
        lock (_gate)
        {
            if (_requests.ContainsKey(id))
                throw new InvalidOperationException("请求标识重复。");
            if (exclusive && _requests.Values.Any(request => request.Operation == operation))
                throw new InvalidOperationException("该操作正在进行中，请等待完成。");

            var lease = new Lease(this, id, operation);
            _requests.Add(id, lease);
            _order.Add(lease);
            return lease;
        }
    }

    internal bool Cancel(string? targetId)
    {
        Lease? lease;
        lock (_gate)
        {
            if (string.IsNullOrWhiteSpace(targetId)) lease = _order.LastOrDefault();
            else _requests.TryGetValue(targetId, out lease);
        }
        if (lease is null) return false;

        // Cancellation callbacks can release or register requests; never invoke them under the lock.
        try { lease.Source.Cancel(); return true; }
        catch (ObjectDisposedException) { return false; }
    }

    internal void CancelAll()
    {
        Lease[] leases;
        lock (_gate) leases = _requests.Values.ToArray();
        foreach (var lease in leases)
        {
            try { lease.Source.Cancel(); }
            catch (ObjectDisposedException) { }
        }
    }

    private void End(Lease lease)
    {
        lock (_gate)
        {
            if (!_requests.TryGetValue(lease.Id, out var current) || !ReferenceEquals(current, lease)) return;
            _requests.Remove(lease.Id);
            _order.Remove(lease);
        }
        lease.Source.Dispose();
    }

    internal sealed class Lease : IDisposable
    {
        private readonly OperationRegistry _registry;
        internal string Id { get; }
        internal string Operation { get; }
        internal CancellationTokenSource Source { get; } = new();
        internal CancellationToken Token { get; }

        internal Lease(OperationRegistry registry, string id, string operation)
        {
            _registry = registry;
            Id = id;
            Operation = operation;
            Token = Source.Token;
        }

        public void Dispose() => _registry.End(this);
    }
}
