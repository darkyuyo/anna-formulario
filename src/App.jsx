import { useState } from 'react'

const STYLE_OPTIONS = [
  'Casual',
  'Street',
  'Luxury',
  'Vintage',
  'Sport',
  'Formal',
  'Boho',
]

const inputClass =
  'h-[3.4cqw] w-full rounded-[0.8cqw] border border-anna-dark bg-anna-cream px-[1cqw] text-[0.9cqw] text-anna-ink placeholder:text-anna-placeholder outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-anna-accent/80'

const labelClass =
  'text-[0.72cqw] font-semibold uppercase tracking-[0.08em]'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Casual')
  const [smsConsent, setSmsConsent] = useState(false)
  const [closetContact, setClosetContact] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-anna-bg font-sans text-anna-cream">
      {/* Brand – left zone, no longer steals width from paper */}
      <aside className="relative z-10 flex justify-center px-6 py-8 lg:absolute lg:top-1/2 lg:left-[2.5vw] lg:w-[min(20vw,240px)] lg:-translate-y-1/2 lg:px-0 lg:py-0">
        <div className="w-full max-w-[min(380px,88vw)]">
          <img
            className="block w-full"
            src="/assets/anna-logo.svg"
            alt="ANNA"
            width={484}
            height={98}
          />
          <p className="mt-[-0.5rem] pr-3 text-right font-script text-[clamp(1.85rem,4vw,3.25rem)] leading-none">
            marketplace
          </p>
        </div>
      </aside>

      {/* Paper + form – fills most of the viewport */}
      <section className="flex min-h-dvh items-center justify-center px-1 py-4 lg:justify-center lg:py-2 lg:pl-[min(22vw,270px)]">
        <div
          className="@container relative aspect-[1724/2153] h-[min(88dvh,980px)] w-auto max-w-[98vw] shrink-0 origin-center overflow-visible drop-shadow-[0_32px_64px_rgba(0,0,0,0.45)] sm:h-[min(90dvh,1040px)] lg:h-[min(86dvh,1080px)] lg:max-w-[calc(100vw-min(22vw,270px)-1rem)] lg:zoom-[1.48] xl:zoom-[1.58]"
        >
          {/* Paper stack + decorations – scaled to match enlarged form */}
          <div
            className="pointer-events-none absolute inset-0 z-0 origin-[51%_43%] scale-[1.34]"
            aria-hidden="true"
          >
            <img
              className="absolute inset-0 h-full w-full rounded-[1.2cqw] object-fill"
              src="/assets/background.png"
              alt=""
            />

            <img
              className="absolute top-[22.8%] left-[26.7%] z-20 w-[19%] -rotate-[11deg] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.28)]"
              src="/assets/hero-image.png"
              alt=""
            />

            <img
              className="absolute top-[21.2%] left-[28.5%] z-30 w-[5.6%]"
              src="/assets/object-left-59747c.png"
              alt=""
            />

            <p className="absolute top-[27.5%] left-[49%] z-20 m-0 font-script text-[4.25cqw] leading-none text-anna-ink">
              Visto x gusto
            </p>
          </div>

          {/* Form – Figma proportions */}
          <section
            className="absolute top-[46.5%] left-[18.8%] z-40 grid w-[61.5%] gap-[2.8cqw] rounded-[1.1cqw] border border-anna-burgundy-border bg-anna-burgundy px-[4.2cqw] py-[4.8cqw] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.25)]"
            aria-labelledby="waitlist-title"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-anna-burgundy-texture opacity-35"
              aria-hidden="true"
            />

            <header className="relative z-10">
              <h1
                id="waitlist-title"
                className="mb-[0.8cqw] font-serif text-[3.1cqw] leading-[1.1] font-extralight tracking-wide uppercase"
              >
                Únete a la comunidad
              </h1>
              <p className="m-0 text-[0.92cqw] leading-relaxed text-anna-muted">
                Descubre drops exclusivas, lanzamientos y consejos de estilo antes
                que nadie.
              </p>
            </header>

            <form
              className="relative z-10 grid gap-[1.7cqw]"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-2 gap-[0.75cqw] max-sm:grid-cols-1">
                <label className="grid gap-[0.55cqw]">
                  <span className={labelClass}>Nombre completo</span>
                  <input
                    type="text"
                    name="firstName"
                    className={inputClass}
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    autoComplete="given-name"
                  />
                </label>

                <label className="grid gap-[0.55cqw]">
                  <span className={`${labelClass} max-sm:hidden opacity-0`}>
                    Apellido
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    className={inputClass}
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    autoComplete="family-name"
                  />
                </label>
              </div>

              <label className="grid gap-[0.55cqw]">
                <span className={labelClass}>Correo electrónico</span>
                <input
                  type="email"
                  name="email"
                  className={inputClass}
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </label>

              <fieldset className="m-0 grid gap-[0.55cqw] border-0 p-0">
                <legend className={labelClass}>Estilo</legend>
                <div
                  className="flex flex-wrap gap-[0.5cqw_0.65cqw]"
                  role="group"
                  aria-label="Estilo"
                >
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      key={style}
                      type="button"
                      className={`min-h-[2.1cqw] cursor-pointer rounded-full border px-[0.75cqw] py-[0.5cqw] text-[0.78cqw] font-semibold transition-colors duration-200 ${
                        selectedStyle === style
                          ? 'border-anna-cream bg-anna-cream text-anna-dark'
                          : 'border-anna-dark bg-anna-dark text-anna-cream hover:border-anna-cream/70'
                      }`}
                      aria-pressed={selectedStyle === style}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="flex cursor-pointer items-start gap-[0.6cqw] text-[0.78cqw] leading-snug font-semibold tracking-[0.08em] uppercase">
                <input
                  type="checkbox"
                  name="closetContact"
                  className="mt-[0.1cqw] size-[1.65cqw] shrink-0 appearance-none rounded-[0.45cqw] border border-anna-cream bg-transparent checked:bg-anna-cream"
                  checked={closetContact}
                  onChange={(event) => setClosetContact(event.target.checked)}
                />
                <span>
                  quieres que te contactemos para ser vender tu clóset
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-[0.6cqw] text-[0.52cqw] leading-snug font-semibold tracking-[0.08em] uppercase">
                <input
                  type="checkbox"
                  name="smsConsent"
                  className="mt-[0.1cqw] size-[1.65cqw] shrink-0 appearance-none rounded-[0.45cqw] border border-anna-cream bg-transparent checked:bg-anna-cream"
                  checked={smsConsent}
                  onChange={(event) => setSmsConsent(event.target.checked)}
                />
                <span>
                  autorización para recibir SMS, notificaciones, y ser parte de
                  la comunidad.
                </span>
              </label>

              <button
                type="submit"
                className="mt-[0.4cqw] h-[3.5cqw] cursor-pointer rounded-[0.85cqw] bg-anna-accent text-[0.85cqw] font-bold tracking-[0.1em] text-anna-dark uppercase shadow-[0_0.5cqw_1.22cqw_-0.5cqw_rgba(0,0,0,0.25)] transition-all duration-200 hover:brightness-105 active:scale-[0.99]"
              >
                Quiero ser parte
              </button>
            </form>
          </section>

          {/* Binder clip – above form */}
          <div
            className="pointer-events-none absolute inset-0 z-50 origin-[51%_43%] scale-[1.34]"
            aria-hidden="true"
          >
            <img
              className="absolute top-[47.3%] left-[69.7%] w-[13%]"
              src="/assets/object-right-76481c.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
