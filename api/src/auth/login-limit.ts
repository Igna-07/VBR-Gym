// ponytail: in-memory, per process; move to the database  if it runs on several instances.
const failures = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

export function loginBlocked(key: string, now = Date.now()) {
  const entry = failures.get(key);
  if (entry && entry.resetAt < now) failures.delete(key);
  return (failures.get(key)?.count ?? 0) >= MAX_FAILURES;
}

export function recordLoginFailure(key: string, now = Date.now()) {
  const entry = failures.get(key) ?? { count: 0, resetAt: now + WINDOW_MS };
  entry.count += 1;
  failures.set(key, entry);
}

export function clearLoginFailures(key: string) {
  failures.delete(key);
}
