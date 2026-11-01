const STORAGE_KEY = 'mgh-tracker:remembered-username'

/** Only the username is ever persisted — never the password. */
export function loadRememberedUsername(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveRememberedUsername(username: string | null): void {
  try {
    if (username) localStorage.setItem(STORAGE_KEY, username)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable (private mode, blocked site data) — remembering is best-effort.
  }
}
