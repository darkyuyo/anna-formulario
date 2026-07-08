const FORM_STEPS = ['Sobre ti', 'Tu clóset', 'Historia', 'Autorizaciones']

function StepIndicator({ step, showProgress }) {
  if (!showProgress || step < 0) return null

  const activeIndex = Math.min(step, FORM_STEPS.length - 1)
  const progress = ((activeIndex + 1) / FORM_STEPS.length) * 100

  return (
    <div className="shrink-0">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="m-0 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-anna-muted">
          Paso {activeIndex + 1} de {FORM_STEPS.length}
        </p>
        <p className="m-0 text-[0.75rem] text-anna-accent">{FORM_STEPS[activeIndex]}</p>
      </div>

      <div className="mb-4 h-1 overflow-hidden rounded-full bg-anna-dark/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-anna-accent to-[#d9a8ad] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        {FORM_STEPS.map((label, index) => {
          const isDone = index < activeIndex
          const isCurrent = index === activeIndex
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`flex size-7 items-center justify-center rounded-full text-[0.7rem] font-bold transition-all ${
                  isDone
                    ? 'bg-anna-accent text-anna-dark'
                    : isCurrent
                      ? 'border-2 border-anna-accent bg-anna-burgundy text-anna-accent'
                      : 'border border-anna-dark/60 bg-anna-dark/30 text-anna-muted'
                }`}
              >
                {isDone ? '✓' : index + 1}
              </div>
              <span
                className={`text-center text-[0.62rem] uppercase tracking-[0.08em] ${
                  isCurrent ? 'text-anna-cream' : 'text-anna-muted/70'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ClosetLayout({ children, step, showProgress = true, isSuccess = false }) {
  return (
    <main className="closet-gradient-bg min-h-dvh font-sans text-anna-cream">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col lg:grid lg:grid-cols-[minmax(280px,38%)_1fr] lg:gap-0">
        <aside className="closet-panel-texture relative hidden overflow-hidden border-r border-anna-burgundy-border/50 bg-anna-burgundy lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-12">
          <div
            className="pointer-events-none absolute inset-0 bg-anna-burgundy-texture opacity-30"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <img
              className="mb-10 w-full max-w-[220px]"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
            <p className="anna-diacritics m-0 font-serif text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.1] font-light uppercase">
              Quiero vender mi clóset
            </p>
            <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-anna-muted">
              Prendas con historia, curadas con gusto. Únete a la comunidad fundadora de ANNA.
            </p>
          </div>

          <p className="relative z-10 font-biro m-0 text-[2.2rem] leading-none text-anna-muted -rotate-6">
            Visto x gusto
          </p>
        </aside>

        <div className="flex min-h-dvh flex-1 flex-col">
          <header className="shrink-0 border-b border-white/5 px-5 py-5 sm:px-8 lg:hidden">
            <img
              className="mx-auto mb-4 w-full max-w-[200px]"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
            {!isSuccess && (
              <StepIndicator step={step} showProgress={showProgress} />
            )}
          </header>

          <div className="flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="hidden lg:block">
              {!isSuccess && (
                <StepIndicator step={step} showProgress={showProgress} />
              )}
            </div>

            <div
              key={step}
              className={`closet-slide-up mt-0 flex flex-1 flex-col lg:mt-6 ${
                isSuccess
                  ? ''
                  : 'rounded-3xl border border-anna-burgundy-border/50 bg-anna-burgundy/85 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] sm:p-6 lg:overflow-y-auto lg:p-8 lg:shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:[scrollbar-width:thin] xl:p-10'
              }`}
            >
              <div className="relative flex flex-1 flex-col">
                {!isSuccess && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] bg-anna-burgundy-texture opacity-20"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex flex-1 flex-col">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
