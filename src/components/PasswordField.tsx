import { forwardRef, useState, type ComponentProps } from 'react'
import { TextField } from './TextField'
import { EyeIcon, EyeOffIcon, LockIcon } from './icons'

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'type' | 'icon' | 'trailing'>

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(props, ref) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      ref={ref}
      {...props}
      type={visible ? 'text' : 'password'}
      icon={<LockIcon />}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-label={visible ? 'Hide password' : 'Show password'}
          title={visible ? 'Hide password' : 'Show password'}
          className="focus-ring flex size-9 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white motion-reduce:transition-none"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      }
    />
  )
})
