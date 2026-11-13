/**
 * localStorage that never throws. Browsers can block storage for embedded
 * (cross-site iframe) pages, private windows or strict privacy settings, and an
 * unguarded access would crash the whole app to a blank screen.
 */
export const safeStorage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable: keep working in memory */
    }
  },
};
