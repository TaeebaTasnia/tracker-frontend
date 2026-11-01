import { DEMO_CREDENTIALS } from '../config/demo'

export type DemoLoginResult = { ok: true; username: string } | { ok: false; error: string }

const SIMULATED_LATENCY_MS = 600

/**
 * Demo-only sign-in. Compares against the bundled sample credentials after a
 * short simulated delay. Replace with a real auth API call when one exists.
 */
export async function demoLogin(username: string, password: string): Promise<DemoLoginResult> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
    return { ok: true, username }
  }
  return { ok: false, error: 'Invalid username or password. Use the demo credentials below.' }
}
