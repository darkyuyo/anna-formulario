import { useState } from 'react'
import AnnaShell from '../components/AnnaShell'
import {
  STYLE_OPTIONS,
  desktopCard,
  fieldGap,
  inputClass,
  labelClass,
} from '../shared/formStyles'

function SuccessView({ variant, titleId, showClosetMessage }) {
  const isMobile = variant === 'mobile'

  const titleClass = isMobile
    ? 'anna-diacritics m-0 font-serif text-[clamp(1.5rem,6.5vw,2.125rem)] leading-[1.2] font-light tracking-normal uppercase text-anna-cream'
    : 'anna-diacritics m-0 font-serif text-[clamp(1.5rem,3.84cqw,2.84rem)] leading-[1.2] font-light tracking-normal uppercase text-anna-cream'

  const textClass = isMobile
    ? 'anna-diacritics font-futura text-center text-[clamp(0.78rem,3.2vw,1.1rem)] leading-[1.4] tracking-[0.01em] text-anna-cream'
    : 'anna-diacritics font-futura text-center text-[clamp(0.7rem,1.91cqw,1.42rem)] leading-[1.4] tracking-[0.01em] text-anna-cream'

  const paragraphGapClass = 'mb-[0.7em] last:mb-0'

  return (
    <div
      className={
        isMobile
          ? 'relative z-10 flex w-full flex-col gap-[clamp(0.75rem,3.5vw,1rem)]'
          : 'relative z-10 flex h-full min-h-0 w-full flex-1 flex-col justify-between gap-[1.2cqw]'
      }
    >
      <header className="shrink-0">
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
          <p className={`m-0 font-semibold ${paragraphGapClass}`}>
            si haz seleccionado la opción para vender tu closet, pronto tendrás
            noticias nuestras.
          </p>
        )}

        <p className={`m-0 font-semibold ${paragraphGapClass}`}>
          Además, tendrás acceso a{' '}
          <span className="font-bold">
            beneficios exclusivos y acceso anticipado
          </span>{' '}
          a nuestro lanzamiento.
        </p>

        <p className="m-0 font-semibold">Gracias por estar aquí desde el comienzo.</p>
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
  isSubmitting,
  onSubmit,
}) {
  const isMobile = variant === 'mobile'

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
              ? 'anna-diacritics mb-2 font-serif text-[clamp(1.5rem,6.5vw,2rem)] leading-[1.2] font-light tracking-normal uppercase'
              : `anna-diacritics mb-[0.85cqw] font-serif leading-[1.2] font-light tracking-normal uppercase ${desktopCard.title}`
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
              : `grid grid-cols-2 @max-[560px]:grid-cols-1 ${desktopCard.gapSm}`
          }
        >
          <label className={`grid ${fieldGap(variant)}`}>
            <span className={labelClass(variant)}>Nombre completo</span>
            <input
              type="text"
              name="firstName"
              className={inputClass(variant)}
              placeholder="Nombre"
              value={firstName}
              disabled={isSubmitting}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
            />
          </label>

          <label className={`grid ${fieldGap(variant)}`}>
            <span
              className={`${labelClass(variant)} ${isMobile ? '' : '@max-[560px]:opacity-100 opacity-0'}`}
            >
              Apellido
            </span>
            <input
              type="text"
              name="lastName"
              className={inputClass(variant)}
              placeholder="Apellido"
              value={lastName}
              disabled={isSubmitting}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
            />
          </label>
        </div>

        <label className={`grid ${fieldGap(variant)}`}>
          <span className={labelClass(variant)}>Correo electrónico</span>
          <input
            type="email"
            name="email"
            className={inputClass(variant)}
            placeholder="tu@email.com"
            value={email}
            disabled={isSubmitting}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>

        <fieldset className={`m-0 grid border-0 p-0 ${fieldGap(variant)}`}>
          <legend className={labelClass(variant)}>Estilo</legend>
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
                disabled={isSubmitting}
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
            disabled={isSubmitting}
            onChange={(event) => setClosetContact(event.target.checked)}
          />
          <span>quieres que te contactemos para vender tu clóset</span>
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
            disabled={isSubmitting}
            onChange={(event) => setSmsConsent(event.target.checked)}
          />
          <span>
            autorización para recibir SMS, notificaciones, y ser parte de la
            comunidad.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={
            isMobile
              ? 'mt-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-anna-accent text-[clamp(0.875rem,3.8vw,1rem)] font-bold tracking-[0.1em] text-anna-dark uppercase shadow-lg transition-all duration-200 enabled:cursor-pointer enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 sm:h-12'
              : `mt-[0.4cqw] flex items-center justify-center gap-[0.5cqw] bg-anna-accent font-bold tracking-[0.1em] text-anna-dark uppercase shadow-[0_0.5cqw_1.22cqw_-0.5cqw_rgba(0,0,0,0.25)] transition-all duration-200 enabled:cursor-pointer enabled:hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 ${desktopCard.submit}`
          }
        >
          {isSubmitting ? (
            <>
              <span
                className={
                  isMobile
                    ? 'size-4 shrink-0 animate-spin rounded-full border-2 border-anna-dark/25 border-t-anna-dark'
                    : 'size-[1.1cqw] shrink-0 animate-spin rounded-full border-[0.15cqw] border-anna-dark/25 border-t-anna-dark'
                }
                aria-hidden="true"
              />
              Enviando...
            </>
          ) : (
            'Quiero ser parte'
          )}
        </button>
      </form>
    </div>
  )
}

export default function WaitlistPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Casual')
  const [smsConsent, setSmsConsent] = useState(false)
  const [closetContact, setClosetContact] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedClosetContact, setSubmittedClosetContact] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
    if (!scriptUrl) {
      console.error('Falta VITE_GOOGLE_SCRIPT_URL en .env')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: new URLSearchParams({
          formType: 'waitlist',
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
    } finally {
      setIsSubmitting(false)
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
    isSubmitting,
    onSubmit: handleSubmit,
  }

  const successProps = {
    showClosetMessage: submittedClosetContact,
  }

  const desktopCardClass = isSubmitted
    ? 'top-[45%] flex min-h-[28.5cqh] flex-col py-[3.4cqw] overflow-hidden'
    : ''

  return (
    <AnnaShell desktopCardClass={desktopCardClass}>
      {{
        mobile: isSubmitted ? (
          <SuccessView variant="mobile" titleId="success-title-mobile" {...successProps} />
        ) : (
          <WaitlistForm variant="mobile" titleId="waitlist-title-mobile" {...formProps} />
        ),
        desktop: isSubmitted ? (
          <SuccessView variant="desktop" titleId="success-title-desktop" {...successProps} />
        ) : (
          <WaitlistForm variant="desktop" titleId="waitlist-title-desktop" {...formProps} />
        ),
      }}
    </AnnaShell>
  )
}
