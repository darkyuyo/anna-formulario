import { useState } from 'react'
import { closetBoxClass } from '../shared/closetStyles'

export default function ExpandableSection({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`overflow-hidden ${closetBoxClass} transition-colors hover:border-anna-accent/35`}>
      <button
        type="button"
        className="flex w-full items-center gap-3 px-3 py-3 text-left sm:px-5 sm:py-4"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
            open
              ? 'rotate-45 border-anna-accent bg-anna-accent text-anna-dark'
              : 'border-anna-accent/70 text-anna-accent'
          }`}
          aria-hidden="true"
        >
          +
        </span>
        <span className="flex-1 text-[0.84rem] font-semibold leading-snug text-anna-cream sm:text-[0.95rem]">
          {title}
        </span>
      </button>
      {open && (
        <div className="closet-expand border-t border-anna-cream/10 px-4 py-4 text-[0.86rem] leading-relaxed text-anna-muted sm:px-5 sm:text-[0.9rem]">
          {children}
        </div>
      )}
    </div>
  )
}
