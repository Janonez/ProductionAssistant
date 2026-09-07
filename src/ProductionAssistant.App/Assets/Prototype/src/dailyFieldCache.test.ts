import { beforeEach, expect, it, vi } from "vitest";
const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("./bridge", () => ({ invoke }));
import { clearDailyFieldCache, getDailyMetrics } from "./dailyFieldCache";
beforeEach(() => { clearDailyFieldCache(); localStorage.clear(); invoke.mockReset(); });
it("shares pending and resolved requests, but separates parent databases", async () => {
  invoke.mockResolvedValue({ metrics: [] });
  const first = getDailyMetrics("job", "a");
  expect(getDailyMetrics("job", "a")).toBe(first);
  await first;
  await getDailyMetrics("job", "a");
  expect(invoke).toHaveBeenCalledTimes(1);
  await getDailyMetrics("job", "b");
  expect(invoke).toHaveBeenCalledTimes(2);
});
it("allows retry after a failed request", async () => {
  invoke.mockRejectedValueOnce(new Error("offline")).mockResolvedValue({ metrics: [] });
  await expect(getDailyMetrics("job", "a")).rejects.toThrow("offline");
  await getDailyMetrics("job", "a");
  expect(invoke).toHaveBeenCalledTimes(2);
});

it("reuses persisted results after the memory cache is cleared, and refreshes explicitly", async () => {
  invoke.mockResolvedValue({ metrics: [{ id: "field", name: "产量" }] });
  await getDailyMetrics("job", "a");
  clearDailyFieldCache();
  const cached = await getDailyMetrics("job", "a");
  expect(cached.metrics[0].name).toBe("产量");
  expect(invoke).toHaveBeenCalledTimes(1);
  await getDailyMetrics("job", "a", true);
  expect(invoke).toHaveBeenCalledTimes(2);
});

it('invalidates every database field directory when settings refreshes databases', async () => {
  invoke.mockResolvedValue({metrics: []});
  await getDailyMetrics('job', 'a');
  await getDailyMetrics('job', 'b');
  localStorage.setItem('unrelated', 'keep');
  clearDailyFieldCache(true);
  await getDailyMetrics('job', 'a');
  await getDailyMetrics('job', 'b');
  expect(invoke).toHaveBeenCalledTimes(4);
  expect(localStorage.getItem('unrelated')).toBe('keep');
});
