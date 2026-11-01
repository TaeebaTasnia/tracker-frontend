import type { ReactNode } from 'react'

type LoginCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

/** Translucent glass panel with MGH branding — shared by the login and demo-session screens. */
export function LoginCard({ title, subtitle, children }: LoginCardProps) {
  return (
    <div className="w-full max-w-[420px] animate-card-in rounded-2xl border border-white/10 bg-navy-900/45 p-6 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/20 backdrop-blur-xl motion-reduce:animate-none sm:p-8">
      <header className="text-center">
        <img
          src="/brand/mgh-logo-white.png"
          alt="MGH"
          width={720}
          height={279}
          className="mx-auto h-11 w-auto select-none"
          draggable={false}
        />
        <div className="mx-auto mt-5 h-px w-12 bg-steel/40" aria-hidden="true" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-1.5 text-sm text-white/60">{subtitle}</p>
      </header>
      {children}
    </div>
  )
}
