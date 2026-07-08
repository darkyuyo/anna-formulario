export const STYLE_OPTIONS = [
  'Casual',
  'Street',
  'Luxury',
  'Vintage',
  'Sport',
  'Formal',
  'Boho',
]

export const paperSceneClass =
  'pointer-events-none absolute inset-0 origin-[50%_38%] scale-[1.62]'

export const desktopCard = {
  title: 'text-[clamp(1.65rem,4.4cqw,2.84rem)]',
  subtitle: 'text-[clamp(0.8rem,1.55cqw,1rem)]',
  label: 'text-[clamp(0.7rem,1.05cqw,0.8rem)]',
  input: 'h-[clamp(2.5rem,4.5cqw,3rem)] text-[clamp(0.875rem,1.45cqw,1rem)] rounded-[0.8cqw] px-[1.15cqw]',
  styleBtn: 'min-h-[clamp(1.65rem,2.35cqw,2rem)] px-[0.9cqw] py-[0.45cqw] text-[clamp(0.7rem,1.05cqw,0.85rem)]',
  checkbox: 'size-[clamp(0.9rem,1.5cqw,1.1rem)] rounded-[0.45cqw]',
  checkboxLabel: 'text-[clamp(0.65rem,1.25cqw,0.8rem)]',
  checkboxLabelMobile: 'text-[clamp(0.6rem,2.8vw,0.75rem)]',
  submit: 'h-[clamp(2.5rem,3.85cqw,3rem)] text-[clamp(0.8rem,1.4cqw,1rem)] rounded-[0.85cqw]',
  gap: 'gap-[clamp(0.65rem,2cqw,1.5rem)]',
  gapSm: 'gap-[clamp(0.45rem,0.85cqw,0.65rem)]',
  gapField: 'gap-[clamp(0.4rem,0.6cqw,0.5rem)]',
  gapFieldMobile: 'gap-[clamp(0.35rem,2vw,0.5rem)]',
}

export const vistoXGustoClass = {
  mobile:
    'mt-[clamp(1rem,5vw,1.5rem)] text-center font-biro text-[clamp(2.25rem,18vw,4.58rem)] leading-none tracking-normal text-anna-muted -rotate-[12.85deg]',
  desktop:
    'absolute top-[27.5%] left-[49%] z-20 m-0 origin-center whitespace-nowrap font-biro text-[4.25cqw] leading-none tracking-normal text-anna-ink -rotate-[12.85deg]',
}

export function inputClass(variant, desktopInput = desktopCard.input) {
  const isMobile = variant === 'mobile'
  return isMobile
    ? 'h-11 w-full rounded-xl border border-anna-dark bg-anna-cream px-3 text-[clamp(0.875rem,3.8vw,1rem)] text-anna-ink placeholder:text-anna-placeholder outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-anna-accent/80 sm:h-12 sm:px-4'
    : `w-full border border-anna-dark bg-anna-cream text-anna-ink placeholder:text-anna-placeholder outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-anna-accent/80 ${desktopInput}`
}

export function labelClass(variant) {
  const isMobile = variant === 'mobile'
  return isMobile
    ? 'text-[clamp(0.65rem,2.8vw,0.75rem)] font-semibold uppercase tracking-[0.08em]'
    : `${desktopCard.label} font-semibold uppercase tracking-[0.08em]`
}

export function fieldGap(variant) {
  return variant === 'mobile' ? desktopCard.gapFieldMobile : desktopCard.gapField
}

export function primaryButtonClass(variant, extra = '') {
  const isMobile = variant === 'mobile'
  return isMobile
    ? `flex h-11 items-center justify-center gap-2 rounded-xl bg-anna-accent text-[clamp(0.875rem,3.8vw,1rem)] font-bold tracking-[0.1em] text-anna-dark uppercase shadow-lg transition-all duration-200 enabled:cursor-pointer enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 sm:h-12 ${extra}`
    : `flex items-center justify-center gap-[0.5cqw] bg-anna-accent font-bold tracking-[0.1em] text-anna-dark uppercase shadow-[0_0.5cqw_1.22cqw_-0.5cqw_rgba(0,0,0,0.25)] transition-all duration-200 enabled:cursor-pointer enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 ${desktopCard.submit} ${extra}`
}

export function secondaryButtonClass(variant) {
  const isMobile = variant === 'mobile'
  return isMobile
    ? 'flex h-11 items-center justify-center rounded-xl border border-anna-cream/60 bg-transparent text-[clamp(0.8rem,3.5vw,0.95rem)] font-semibold tracking-[0.06em] text-anna-cream uppercase transition-colors hover:border-anna-cream sm:h-12'
    : 'flex h-[clamp(2.5rem,3.85cqw,3rem)] items-center justify-center rounded-[0.85cqw] border border-anna-cream/60 bg-transparent text-[clamp(0.8rem,1.4cqw,1rem)] font-semibold tracking-[0.06em] text-anna-cream uppercase transition-colors hover:border-anna-cream'
}
