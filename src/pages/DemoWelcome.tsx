import { useEffect, useRef } from 'react'
import { LoginCard } from '../components/LoginCard'
import { CheckIcon } from '../components/icons'

type DemoWelcomeProps = {
  username: string
  onSignOut: () => void
}

/** Placeholder landing screen after a successful demo sign-in. */
export function DemoWelcome({ username, onSignOut }: DemoWelcomeProps) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <LoginCard title="Shipment Tracker" subtitle="Track your shipments. Stay informed.">
      <div ref={headingRef} tabIndex={-1} role="status" className="mt-7 text-center outline-none">
        <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CheckIcon width={22} height={22} />
        </span>
        <p className="mt-4 text-[15px] font-medium text-white">
          Signed in as <span className="font-mono">{username}</span>
        </p>
        <p className="mt-1.5 text-[13px] text-white/55">
          This is a demo session. No real authentication took place and no shipment data is connected.
        </p>
      </div>

      <button
        type="button"
        onClick={onSignOut}
        className="focus-ring mt-7 h-11 w-full rounded-lg border border-white/15 bg-white/5 text-[14px] font-medium text-white transition-colors hover:bg-white/10 motion-reduce:transition-none"
      >
        Sign out
      </button>
    </LoginCard>
  )
}
