import { invoke } from "./bridge";
export type DailyMetric = { id: string; name: string; defaultAggregate: string; granularity: string; hasFixedFilter: boolean; filterDescription: string };
// Metric definitions can depend on the task as well as the database.
const fields = new Map<string, Promise<{ metrics: DailyMetric[] }>>();
export function getDailyMetrics(jobId: string, sourceId: string, refresh = false) {
  const key = JSON.stringify([jobId, sourceId]);
  const storageKey = `daily-field-cache-v1:${key}`;
  let pending = refresh ? undefined : fields.get(key);
  if (!pending && !refresh) {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved && Array.isArray(saved.metrics) && saved.metrics.every((field: DailyMetric) => field && typeof field.id === "string" && typeof field.name === "string")) {
        pending = Promise.resolve(saved);
        fields.set(key, pending);
      }
    } catch { /* Missing/corrupt storage falls back to the live directory. */ }
  }
  if (!pending) {
    pending = invoke<{ metrics: DailyMetric[] }>("daily.getProperties", { id: jobId, sourceId })
      .then(result => {
        try { localStorage.setItem(storageKey, JSON.stringify(result)); } catch { /* Memory cache still works when storage is unavailable. */ }
        return result;
      })
      .catch(error => { fields.delete(key); throw error; });
    fields.set(key, pending);
  }
  return pending;
}
export function clearDailyFieldCache() { fields.clear(); }

