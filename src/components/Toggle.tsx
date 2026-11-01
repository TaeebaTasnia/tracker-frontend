import { useId } from 'react'

type ToggleProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Accessible on/off switch (role="switch"); the label is clickable too. */
export function Toggle({ label, checked, onChange }: ToggleProps) {
  const labelId = useId()

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className={`focus-ring relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-200 motion-reduce:transition-none ${
          checked ? 'border-brand-500 bg-brand-600' : 'border-white/15 bg-white/10 hover:bg-white/15'
        }`}
      >
        <span
          className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform duration-200 motion-reduce:transition-none ${
            checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
          }`}
        />
      </button>
      <span id={labelId} onClick={() => onChange(!checked)} className="cursor-pointer select-none text-[13px] text-white/75">
        {label}
      </span>
    </div>
  )
}
