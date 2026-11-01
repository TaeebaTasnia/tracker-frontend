import { DEMO_CREDENTIALS } from '../config/demo'
import { InfoIcon } from './icons'

type DemoCredentialsProps = {
  onUse: () => void
}

export function DemoCredentials({ onUse }: DemoCredentialsProps) {
  return (
    <section
      aria-labelledby="demo-credentials-heading"
      className="mt-6 rounded-lg border border-white/10 bg-navy-950/40 px-4 py-3.5"
    >
      <div className="flex items-start gap-2.5">
        <InfoIcon width={16} height={16} className="mt-0.5 shrink-0 text-steel" />
        <div className="min-w-0 flex-1">
          <h2 id="demo-credentials-heading" className="text-[12px] font-semibold tracking-wide text-white/80 uppercase">
            Demo credentials
          </h2>
          <p className="mt-0.5 text-[12px] text-white/50">Sample account for demonstration only — no real authentication.</p>

          <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
            <dt className="text-white/50">Username</dt>
            <dd className="font-mono text-white/90">{DEMO_CREDENTIALS.username}</dd>
            <dt className="text-white/50">Password</dt>
            <dd className="font-mono text-white/90">{DEMO_CREDENTIALS.password}</dd>
          </dl>

          <button
            type="button"
            onClick={onUse}
            className="focus-ring mt-2.5 rounded text-[13px] font-medium text-brand-300 underline-offset-4 transition-colors hover:text-white hover:underline motion-reduce:transition-none"
          >
            Use demo credentials
          </button>
        </div>
      </div>
    </section>
  )
}
