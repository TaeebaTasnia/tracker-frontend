import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  icon: ReactNode
  error?: string
  /** Optional control rendered inside the right edge of the input (e.g. a show/hide button). */
  trailing?: ReactNode
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, icon, error, trailing, className = '', ...inputProps },
  ref,
) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-white/80">
        {label}
      </label>
      <div className="group relative">
        <span
          className={`pointer-events-none absolute inset-y-0 left-3.5 flex items-center transition-colors ${
            error ? 'text-red-300' : 'text-white/45 group-focus-within:text-brand-300'
          }`}
        >
          {icon}
        </span>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg border bg-white/[0.05] pl-11 text-[15px] text-white placeholder:text-white/35 transition-[border-color,background-color,box-shadow] duration-200 outline-none motion-reduce:transition-none hover:bg-white/[0.07] focus:bg-white/[0.08] focus:ring-2 ${
            trailing ? 'pr-12' : 'pr-4'
          } ${
            error
              ? 'border-red-400/70 focus:border-red-300 focus:ring-red-400/30'
              : 'border-white/12 hover:border-white/25 focus:border-brand-300/80 focus:ring-brand-300/25'
          }`}
          {...inputProps}
        />
        {trailing && <div className="absolute inset-y-0 right-1.5 flex items-center">{trailing}</div>}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-red-300">
          {error}
        </p>
      )}
    </div>
  )
})
