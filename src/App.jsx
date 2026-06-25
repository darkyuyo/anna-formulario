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

const paperSceneClass =
  'pointer-events-none absolute inset-0 origin-[50%_38%] scale-[1.62]'

// Figma card ≈786px wide, 66% of @container → px/786*66 cqw
const desktopCard = {
  title: 'text-[clamp(1.5rem,3.84cqw,2.84rem)]',
  subtitle: 'text-[clamp(0.75rem,1.35cqw,1rem)]',
  label: 'text-[clamp(0.625rem,0.93cqw,0.75rem)]',
  input: 'h-[clamp(2.25rem,3.97cqw,3rem)] text-[clamp(0.8rem,1.27cqw,1rem)] rounded-[0.8cqw] px-[1.15cqw]',
  styleBtn: 'min-h-[clamp(1.5rem,2.1cqw,2rem)] px-[0.9cqw] py-[0.45cqw] text-[clamp(0.625rem,0.93cqw,0.8rem)]',
  checkbox: 'size-[clamp(0.85rem,1.4cqw,1.1rem)] rounded-[0.45cqw]',
  checkboxLabel: 'text-[clamp(0.6rem,1.15cqw,0.8rem)]',
  checkboxLabelMobile: 'text-[clamp(0.6rem,2.8vw,0.75rem)]',
  submit: 'h-[clamp(2.25rem,3.5cqw,3rem)] text-[clamp(0.75rem,1.27cqw,1rem)] rounded-[0.85cqw]',
  gap: 'gap-[clamp(0.75rem,2.2cqw,1.5rem)]',
  gapSm: 'gap-[clamp(0.4rem,0.75cqw,0.65rem)]',
  gapField: 'gap-[clamp(0.35rem,0.55cqw,0.5rem)]',
  gapFieldMobile: 'gap-[clamp(0.35rem,2vw,0.5rem)]',
}

const vistoXGustoClass = {
  mobile:
    'mt-[clamp(1rem,5vw,1.5rem)] text-center font-biro text-[clamp(2.25rem,18vw,4.58rem)] leading-none tracking-normal text-anna-muted -rotate-[12.85deg]',
  desktop:
    'absolute top-[27.5%] left-[49%] z-20 m-0 origin-center whitespace-nowrap font-biro text-[4.25cqw] leading-none tracking-normal text-anna-ink -rotate-[12.85deg]',
}

function SuccessView({ variant, titleId, showClosetMessage }) {
  const isMobile = variant === 'mobile'

  const titleClass = isMobile
    ? 'm-0 font-serif text-[clamp(1.5rem,6.5vw,2.125rem)] leading-[1.1] font-extralight tracking-normal uppercase text-anna-cream'
    : 'm-0 font-serif text-[clamp(1.5rem,3.84cqw,2.84rem)] leading-[1.1] font-extralight tracking-normal uppercase text-anna-cream'

  const textClass = isMobile
    ? 'font-futura text-center text-[clamp(0.78rem,3.2vw,1.1rem)] leading-[1.15] tracking-[0.01em] text-anna-cream'
    : 'font-futura text-center text-[clamp(0.7rem,1.91cqw,1.42rem)] leading-[1.15] tracking-[0.01em] text-anna-cream'

  const paragraphGapClass = 'mb-[0.7em] last:mb-0'

  return (
    <div
      className={
        isMobile
          ? 'relative z-10 flex w-full flex-col gap-[clamp(0.75rem,3.5vw,1rem)]'
          : 'relative z-10 flex h-full min-h-0 w-full flex-1 flex-col justify-between gap-[1.2cqw]'
      }
    >
      <header className={isMobile ? 'shrink-0' : 'shrink-0'}>
        <h1 id={titleId} className={titleClass}>
          Bienvenida a ANNA
        </h1>
      </header>

      <div
        className={`${textClass} ${
          isMobile ? 'shrink-0' : 'flex min-h-0 flex-1 flex-col justify-center'
        }`}
      >
        <p className={`m-0 font-bold ${paragraphGapClass}`}>
          Ya eres parte de nuestra comunidad fundadora.
        </p>

        {showClosetMessage && (
          <p className={`m-0 font-medium ${paragraphGapClass}`}>
            si haz seleccionado la opción para vender tu closet, pronto tendrás
            noticias nuestras.
          </p>
        )}

        <p className={`m-0 font-medium ${paragraphGapClass}`}>
          Además, tendrás acceso a{' '}
          <span className="font-bold">
            beneficios exclusivos y acceso anticipado
          </span>{' '}
          a nuestro lanzamiento.
        </p>

        <p className="m-0 font-medium">Gracias por estar aquí desde el comienzo.</p>
      </div>

      <p className={`m-0 shrink-0 font-medium ${textClass}`}>
        @somosanna.com | Nos gusta vestir bien
      </p>
    </div>
  )
}

function WaitlistForm({
  variant,
  titleId,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  selectedStyle,
  setSelectedStyle,
  closetContact,
  setClosetContact,
  smsConsent,
  setSmsConsent,
  onSubmit,
}) {
  const isMobile = variant === 'mobile'

  const inputClass = isMobile
    ? 'h-11 w-full rounded-xl border border-anna-dark bg-anna-cream px-3 text-[clamp(0.875rem,3.8vw,1rem)] text-anna-ink placeholder:text-anna-placeholder outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-anna-accent/80 sm:h-12 sm:px-4'
    : `w-full border border-anna-dark bg-anna-cream text-anna-ink placeholder:text-anna-placeholder outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-anna-accent/80 ${desktopCard.input}`

  const labelClass = isMobile
    ? 'text-[clamp(0.65rem,2.8vw,0.75rem)] font-semibold uppercase tracking-[0.08em]'
    : `${desktopCard.label} font-semibold uppercase tracking-[0.08em]`

  const styleButtonClass = (active) =>
    isMobile
      ? `min-h-9 cursor-pointer rounded-full border px-[clamp(0.65rem,3vw,1rem)] py-1.5 text-[clamp(0.7rem,3vw,0.875rem)] font-semibold transition-colors duration-200 sm:min-h-10 sm:py-2 ${
          active
            ? 'border-anna-cream bg-anna-cream text-anna-dark'
            : 'border-anna-dark bg-anna-dark text-anna-cream'
        }`
      : `cursor-pointer rounded-full border font-semibold transition-colors duration-200 ${desktopCard.styleBtn} ${
          active
            ? 'border-anna-cream bg-anna-cream text-anna-dark'
            : 'border-anna-dark bg-anna-dark text-anna-cream hover:border-anna-cream/70'
        }`

  const checkboxLabelClass = isMobile
    ? desktopCard.checkboxLabelMobile
    : desktopCard.checkboxLabel

  const fieldGap = isMobile ? desktopCard.gapFieldMobile : desktopCard.gapField

  const checkboxClass = isMobile
    ? 'mt-0.5 size-[clamp(1rem,4.5vw,1.25rem)] shrink-0 appearance-none rounded-md border border-anna-cream bg-transparent checked:bg-anna-cream'
    : `mt-[0.1cqw] shrink-0 appearance-none border border-anna-cream bg-transparent checked:bg-anna-cream ${desktopCard.checkbox}`

  return (
    <div
      className={
        isMobile
          ? 'relative z-10 grid gap-[clamp(1rem,4vw,1.25rem)]'
          : 'relative z-10 grid'
      }
    >
      <header className="relative z-10">
        <h1
          id={titleId}
          className={
            isMobile
              ? 'mb-2 font-serif text-[clamp(1.5rem,6.5vw,2rem)] leading-[1.1] font-extralight tracking-normal uppercase'
              : `mb-[0.85cqw] font-serif leading-[1.1] font-extralight tracking-normal uppercase ${desktopCard.title}`
          }
        >
          Únete a la comunidad
        </h1>
        <p
          className={
            isMobile
              ? 'm-0 text-[clamp(0.8rem,3.5vw,0.95rem)] leading-relaxed text-anna-muted'
              : `m-0 leading-relaxed text-anna-muted ${desktopCard.subtitle}`
          }
        >
          Descubre drops exclusivas, lanzamientos y consejos de estilo antes que
          nadie.
        </p>
      </header>

      <form
        className={
          isMobile
            ? 'relative z-10 grid gap-[clamp(0.85rem,3.5vw,1rem)]'
            : `relative z-10 grid ${desktopCard.gap}`
        }
        onSubmit={onSubmit}
      >
        <div
          className={
            isMobile
              ? 'grid grid-cols-1 gap-[clamp(0.85rem,3.5vw,1rem)] min-[400px]:grid-cols-2'
              : `grid grid-cols-2 ${desktopCard.gapSm}`
          }
        >
          <label className={`grid ${fieldGap}`}>
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

          <label className={`grid ${fieldGap}`}>
            <span className={`${labelClass} ${isMobile ? '' : 'opacity-0'}`}>
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

        <label className={`grid ${fieldGap}`}>
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

        <fieldset className={`m-0 grid border-0 p-0 ${fieldGap}`}>
          <legend className={labelClass}>Estilo</legend>
          <div
            className={
              isMobile
                ? 'flex flex-wrap gap-[clamp(0.35rem,2vw,0.5rem)]'
                : 'flex flex-wrap gap-[0.5cqw_0.65cqw]'
            }
            role="group"
            aria-label="Estilo"
          >
            {STYLE_OPTIONS.map((style) => (
              <button
                key={style}
                type="button"
                className={styleButtonClass(selectedStyle === style)}
                aria-pressed={selectedStyle === style}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>
        </fieldset>

        <label
          className={
            isMobile
              ? `flex cursor-pointer items-start gap-[clamp(0.5rem,2.5vw,0.75rem)] leading-snug font-semibold tracking-[0.06em] uppercase ${checkboxLabelClass}`
              : `flex cursor-pointer items-start gap-[0.6cqw] leading-snug font-semibold tracking-[0.08em] uppercase ${checkboxLabelClass}`
          }
        >
          <input
            type="checkbox"
            name="closetContact"
            className={checkboxClass}
            checked={closetContact}
            onChange={(event) => setClosetContact(event.target.checked)}
          />
          <span>quieres que te contactemos para ser vender tu clóset</span>
        </label>

        <label
          className={
            isMobile
              ? `flex cursor-pointer items-start gap-[clamp(0.5rem,2.5vw,0.75rem)] leading-snug font-semibold tracking-[0.05em] uppercase ${checkboxLabelClass}`
              : `flex cursor-pointer items-start gap-[0.6cqw] leading-snug font-semibold tracking-[0.08em] uppercase ${checkboxLabelClass}`
          }
        >
          <input
            type="checkbox"
            name="smsConsent"
            className={checkboxClass}
            checked={smsConsent}
            onChange={(event) => setSmsConsent(event.target.checked)}
          />
          <span>
            autorización para recibir SMS, notificaciones, y ser parte de la
            comunidad.
          </span>
        </label>

        <button
          type="submit"
          className={
            isMobile
              ? 'mt-1 h-11 cursor-pointer rounded-xl bg-anna-accent text-[clamp(0.875rem,3.8vw,1rem)] font-bold tracking-[0.1em] text-anna-dark uppercase shadow-lg transition-all duration-200 hover:brightness-105 active:scale-[0.99] sm:h-12'
              : `mt-[0.4cqw] cursor-pointer bg-anna-accent font-bold tracking-[0.1em] text-anna-dark uppercase shadow-[0_0.5cqw_1.22cqw_-0.5cqw_rgba(0,0,0,0.25)] transition-all duration-200 hover:brightness-105 active:scale-[0.99] ${desktopCard.submit}`
          }
        >
          Quiero ser parte
        </button>
      </form>
    </div>
  )
}

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Casual')
  const [smsConsent, setSmsConsent] = useState(false)
  const [closetContact, setClosetContact] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedClosetContact, setSubmittedClosetContact] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      console.error('Falta VITE_GOOGLE_SCRIPT_URL en .env')
      return
    }

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: new URLSearchParams({
          firstName,
          lastName,
          email,
          selectedStyle,
          closetContact: String(closetContact),
          smsConsent: String(smsConsent),
        }),
      })

      const text = await response.text()
      let result = {}
      try {
        result = JSON.parse(text)
      } catch {
        result = { success: response.ok }
      }

      if (result.success) {
        setSubmittedClosetContact(closetContact)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error(error)
      alert('Hubo un error. Intenta de nuevo.')
    }
  }

  const formProps = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    selectedStyle,
    setSelectedStyle,
    closetContact,
    setClosetContact,
    smsConsent,
    setSmsConsent,
    onSubmit: handleSubmit,
  }

  const successProps = {
    showClosetMessage: submittedClosetContact,
  }

  return (
    <main className="min-h-dvh overflow-x-hidden bg-anna-bg font-sans text-anna-cream">
      {/* ── Mobile view ── */}
      <div className="lg:hidden">
        <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-[clamp(0.75rem,4vw,1.25rem)] pb-[clamp(1.5rem,6vw,2.5rem)] pt-[clamp(1rem,5vw,1.5rem)]">
          <header className="mb-[clamp(1rem,5vw,1.5rem)] shrink-0 text-center">
            <img
              className="mx-auto w-full max-w-[min(280px,72vw)]"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
          </header>

          <div
            className={`relative overflow-hidden rounded-2xl border border-anna-burgundy-border bg-anna-burgundy shadow-[0_16px_48px_rgba(0,0,0,0.4)] p-[clamp(1rem,4vw,1.5rem)]`}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-anna-burgundy-texture opacity-35"
              aria-hidden="true"
            />
            <section
              className={
                isSubmitted
                  ? 'relative'
                  : 'relative grid gap-[clamp(1rem,4vw,1.25rem)]'
              }
              aria-labelledby={
                isSubmitted ? 'success-title-mobile' : 'waitlist-title-mobile'
              }
            >
              {isSubmitted ? (
                <SuccessView
                  variant="mobile"
                  titleId="success-title-mobile"
                  {...successProps}
                />
              ) : (
                <WaitlistForm
                  variant="mobile"
                  titleId="waitlist-title-mobile"
                  {...formProps}
                />
              )}
            </section>
          </div>

          <p className={vistoXGustoClass.mobile}>Visto x gusto</p>
        </div>
      </div>

      {/* ── Desktop view ── */}
      <div className="relative hidden min-h-dvh overflow-hidden lg:block">
        <aside className="absolute top-[calc(50%-clamp(1.5rem,4.5vh,3.25rem))] left-[clamp(1rem,2.5vw,2.5rem)] z-10 w-[min(28vw,380px)] -translate-y-1/2">
          <div className="w-full">
            <img
              className="block w-full"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
          </div>
        </aside>

        <section className="flex min-h-dvh items-center justify-center overflow-hidden pb-4 pt-0 pl-[clamp(12rem,28vw,22rem)] pr-4">
          <div className="@container relative aspect-[1724/2153] h-auto w-[min(calc(100vw-clamp(12rem,28vw,22rem)-2rem),calc((100dvh-2rem)*1724/2153))] max-h-[min(88dvh,1080px)] shrink-0 origin-center -translate-y-[clamp(2.5rem,8vh,6.5rem)] drop-shadow-[0_32px_64px_rgba(0,0,0,0.45)]">
            <div className={`${paperSceneClass} z-0`} aria-hidden="true">
              <img
                className="absolute inset-0 h-full w-full rounded-[1.2cqw] object-fill"
                src="/assets/background.png"
                alt=""
              />
              <img
                className="absolute top-[23.5%] left-[27.5%] z-20 w-[14%] -rotate-[11deg] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.28)]"
                src="/assets/hero-image.png"
                alt=""
              />
              <img
                className="absolute top-[22%] left-[29%] z-30 w-[4.5%]"
                src="/assets/object-left-59747c.png"
                alt=""
              />
              <p className={vistoXGustoClass.desktop}>Visto x gusto</p>
            </div>

            <section
              className={`absolute top-[45%] left-[18.8%] z-40 w-[66%] rounded-[1.1cqw] border border-anna-burgundy-border bg-anna-burgundy px-[4.2cqw] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.25)] ${
                isSubmitted
                  ? 'flex min-h-[28.5cqh] flex-col py-[3.4cqw]'
                  : 'grid max-h-[62cqh] gap-[clamp(0.75rem,2.2cqw,1.75rem)] overflow-y-auto overscroll-contain py-[clamp(2rem,4.8cqw,3.5rem)] [scrollbar-width:thin]'
              }`}
              aria-labelledby={
                isSubmitted ? 'success-title-desktop' : 'waitlist-title-desktop'
              }
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-anna-burgundy-texture opacity-35"
                aria-hidden="true"
              />
              {isSubmitted ? (
                <SuccessView
                  variant="desktop"
                  titleId="success-title-desktop"
                  {...successProps}
                />
              ) : (
                <WaitlistForm
                  variant="desktop"
                  titleId="waitlist-title-desktop"
                  {...formProps}
                />
              )}
            </section>

            <div className={`${paperSceneClass} z-50`} aria-hidden="true">
              <img
                className="absolute top-[45.8%] left-[69.7%] w-[13%]"
                src="/assets/object-right-76481c.png"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
