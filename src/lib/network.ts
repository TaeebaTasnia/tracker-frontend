type NetworkInformation = { saveData?: boolean; effectiveType?: string }

/** True when the browser reports Data Saver or a 2G-class connection. */
export function isSlowConnection(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (!connection) return false
  return Boolean(connection.saveData) || /(^|-)2g$/.test(connection.effectiveType ?? '')
}
