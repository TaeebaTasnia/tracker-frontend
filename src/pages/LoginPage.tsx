import { useRef, useState, type FormEvent } from 'react'
import { LoginCard } from '../components/LoginCard'
import { TextField } from '../components/TextField'
import { PasswordField } from '../components/PasswordField'
import { Toggle } from '../components/Toggle'
import { DemoCredentials } from '../components/DemoCredentials'
import { AlertIcon, InfoIcon, Spinner, UserIcon } from '../components/icons'
import { DEMO_CREDENTIALS } from '../config/demo'
import { demoLogin } from '../lib/demoAuth'
import { loadRememberedUsername, saveRememberedUsername } from '../lib/rememberedUser'

type FieldErrors = { username?: string; password?: string }

type LoginPageProps = {
  onSignedIn: (username: string) => void
}

export function LoginPage({ onSignedIn }: LoginPageProps) {
  const [username, setUsername] = useState(loadRememberedUsername)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => loadRememberedUsername() !== '')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [showResetNote, setShowResetNote] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitting) return

    const user = username.trim()
    const errors: FieldErrors = {}
    if (!user) errors.username = 'Username is required.'
    if (!password) errors.password = 'Password is required.'

    setFieldErrors(errors)
    setFormError(null)
    if (errors.username) return usernameRef.current?.focus()
    if (errors.password) return passwordRef.current?.focus()

    setSubmitting(true)
    const result = await demoLogin(user, password)
    setSubmitting(false)

    if (!result.ok) {
      setFormError(result.error)
      setPassword('')
      passwordRef.current?.focus()
      return
    }

    saveRememberedUsername(remember ? result.username : null)
    onSignedIn(result.username)
  }

  const fillDemoCredentials = () => {
    setUsername(DEMO_CREDENTIALS.username)
    setPassword(DEMO_CREDENTIALS.password)
    setFieldErrors({})
    setFormError(null)
    usernameRef.current?.focus()
  }

  return (
    <LoginCard title="Shipment Tracker" subtitle="Track your shipments. Stay informed.">
      <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-4" aria-describedby={formError ? 'form-error' : undefined}>
        {formError && (
          <div
            id="form-error"
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3.5 py-3 text-[13px] text-red-200"
          >
            <AlertIcon width={16} height={16} className="mt-0.5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <TextField
          ref={usernameRef}
          label="Username"
          name="username"
          type="text"
          icon={<UserIcon />}
          placeholder="Enter username"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            if (fieldErrors.username) setFieldErrors((prev) => ({ ...prev, username: undefined }))
          }}
          error={fieldErrors.username}
        />

        <PasswordField
          ref={passwordRef}
          label="Password"
          name="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }))
          }}
          error={fieldErrors.password}
        />

        <div className="flex items-center justify-between gap-4 pt-0.5">
          <Toggle label="Remember me" checked={remember} onChange={setRemember} />
          <button
            type="button"
            onClick={() => setShowResetNote((v) => !v)}
            aria-expanded={showResetNote}
            aria-controls="reset-note"
            className="focus-ring rounded text-[13px] font-medium text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline motion-reduce:transition-none"
          >
            Forgot password?
          </button>
        </div>

        {showResetNote && (
          <p id="reset-note" className="flex items-start gap-2 text-[12.5px] text-white/60">
            <InfoIcon width={15} height={15} className="mt-0.5 shrink-0 text-steel" />
            Password reset isn’t available in this demo. Please contact your MGH system administrator.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="focus-ring mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 text-[15px] font-semibold text-white shadow-lg shadow-brand/30 transition-[background-color,box-shadow,transform] duration-200 hover:bg-brand-500 hover:shadow-brand/40 active:translate-y-px disabled:cursor-wait disabled:opacity-80 motion-reduce:transition-none"
        >
          {submitting ? (
            <>
              <Spinner />
              Signing in…
            </>
          ) : (
            'Log In'
          )}
        </button>
      </form>

      <DemoCredentials onUse={fillDemoCredentials} />
    </LoginCard>
  )
}
