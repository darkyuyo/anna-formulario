import { useState } from 'react'
import ClosetLayout from '../components/ClosetLayout'
import ExpandableSection from '../components/ExpandableSection'
import { closetBoxClass } from '../shared/closetStyles'
import {
  hasErrors,
  validateAboutCloset,
  validateAboutYou,
  validateStory,
} from '../shared/closetValidation'

const STEPS = {
  LANDING: 0,
  INTRO: 1,
  ABOUT_YOU: 2,
  ABOUT_CLOSET: 3,
  STORY: 4,
  AUTHORIZATION: 5,
  SUCCESS: 6,
}

const CITY_OPTIONS = [
  'Santiago',
  'Valparaíso',
  'Viña del Mar',
  'Concepción',
  'La Serena',
  'Antofagasta',
  'Temuco',
  'Rancagua',
  'Talca',
  'Puerto Montt',
  'Iquique',
  'Arica',
  'Otra',
]

const GARMENT_QUANTITY_OPTIONS = [
  'Entre 5 y 10 prendas',
  'Entre 10 y 20 prendas',
  'Entre 20 y 30 prendas',
  'Más de 30 prendas',
]

const GARMENT_TYPE_OPTIONS = [
  'Mujer',
  'Hombre',
  'Infantil',
  'Básicos',
  'Casual',
  'Oficina',
  'Fiesta',
  'Premium',
  'Diseñador',
  'Vintage',
  'Carteras',
  'Zapatos',
  'Accesorios',
  'Otro',
]

const CONDITION_OPTIONS = [
  'Nuevas (con etiqueta)',
  'Como nuevas (sin uso o una postura)',
  'Excelente estado (sin detalles)',
]

const PREVIOUS_SALES_OPTIONS = [
  'Sí, frecuentemente.',
  'Sí, algunas veces.',
  'No, sería mi primera experiencia.',
]

const CONSIGNMENT_OPTIONS = ['Sí', 'No', 'Quiero recibir más información']

const EXPANDABLE_SECTIONS = [
  {
    title: 'Las marcas que forman parte de nuestra curaduría',
    content: (
      <>
        <p className="m-0 mb-3">
          Buscamos prendas que destaquen por su diseño, calidad y permanencia en el
          tiempo. Nos interesa reunir marcas que nuestra comunidad reconoce y valora.
        </p>
        <p className="m-0 mb-3">
          Entre ellas: Adidas, Banana Republic, Bimba y Lola, Brooks Brothers,
          Converse, Jazmín Chebar, Lacoste, Levi&apos;s, María Cher, Massimo Dutti,
          Polo Ralph Lauren, Prüne, Purificación García, Rapsodia, Scalpers y Zadig
          &amp; Voltaire, además de reconocidas marcas americanas, europeas,
          diseñadores independientes y marcas de lujo.
        </p>
        <p className="m-0">
          La lista no es excluyente. Siempre estamos abiertos a descubrir nuevas
          propuestas que compartan nuestra mirada sobre el buen gusto.
        </p>
      </>
    ),
  },
  {
    title: 'El estado esperado de las prendas',
    content: (
      <>
        <p className="m-0 mb-3">
          Buscamos prendas nuevas (con o sin etiqueta) o en excelente estado de
          conservación (por supuesto, limpias, planchadas y sin defectos).
        </p>
        <p className="m-0">
          Que quien la reciba sienta la misma satisfacción que tendría al encontrar
          una verdadera joya.
        </p>
      </>
    ),
  },
  {
    title: 'Consejos para preparar tu clóset',
    content: (
      <>
        <p className="m-0 mb-3">
          Revisa aquellas prendas que ya no usas, pero que siguen representando la
          calidad y el estilo que te gustaría encontrar al comprar.
        </p>
        <p className="m-0">
          Selecciona las que estén en excelente estado y prepáralas para que otra
          persona pueda disfrutarlas.
        </p>
      </>
    ),
  },
  {
    title: 'Cómo aumentar las posibilidades de ser seleccionado(a)',
    content: (
      <>
        <p className="m-0 mb-3">
          La mejor postulación no es la que tiene más prendas, sino la que refleja
          una selección cuidada.
        </p>
        <p className="m-0">
          Un clóset con marcas afines a ANNA, prendas en excelente estado y un estilo
          coherente tendrá mayores posibilidades de ser seleccionado.
        </p>
      </>
    ),
  },
  {
    title: '¿Qué haremos en esta etapa?',
    content: (
      <>
        <p className="m-0 mb-3">
          Estamos en una etapa de prelanzamiento, construyendo la comunidad fundadora
          de ANNA.
        </p>
        <p className="m-0 mb-3">
          Si tu clóset es preseleccionado, nos pondremos en contacto contigo para
          contarte los siguientes pasos.
        </p>
        <p className="m-0 mb-3">
          Como beneficio de lanzamiento, quienes se incorporen en esta etapa
          accederán a una comisión promocional del 20%, por tiempo limitado.
        </p>
        <p className="m-0">
          Además de publicar tus prendas, las daremos a conocer a través de
          nuestras redes sociales, contenido editorial y distintas acciones de
          difusión para aumentar sus posibilidades de venta.
        </p>
      </>
    ),
  },
  {
    title: '¿Qué sigue después?',
    content: (
      <>
        <p className="m-0 mb-3">
          Estamos preparando nuevas herramientas y beneficios para que vender en ANNA
          sea cada vez más simple, seguro y exitoso.
        </p>
        <p className="m-0">
          Pronto, te invitamos a unirte al Canal Privado ANNA, donde compartimos
          nuevos ingresos, inspiración, eventos, historias y todas las novedades de
          nuestro lanzamiento que se vendrá.
        </p>
      </>
    ),
  },
]

const initialForm = {
  fullName: '',
  email: '',
  whatsapp: '',
  instagram: '',
  city: '',
  garmentQuantity: '',
  garmentTypes: [],
  brands: '',
  condition: '',
  previousSales: '',
  consignment: '',
  closetStory: '',
  dataConsent: false,
  communicationsConsent: false,
}

const inputClass =
  'h-11 w-full rounded-xl border border-anna-dark/80 bg-anna-cream px-3 text-base text-anna-ink placeholder:text-anna-placeholder outline-none transition-all focus:border-anna-accent focus:ring-2 focus:ring-anna-accent/30 sm:h-12 sm:px-4 sm:text-[0.95rem]'

function inputClassWithError(hasError) {
  return hasError
    ? `${inputClass} border-anna-accent ring-2 ring-anna-accent/30`
    : inputClass
}

function FieldError({ message }) {
  if (!message) return null

  return (
    <p className="m-0 text-[0.78rem] leading-snug text-anna-accent" role="alert">
      {message}
    </p>
  )
}

function SectionError({ message }) {
  if (!message) return null

  return (
    <p className="mb-3 text-[0.78rem] leading-snug text-anna-accent" role="alert">
      {message}
    </p>
  )
}

const labelClass =
  'text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-anna-muted'

const sectionTitleClass =
  'text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-anna-cream'

const bodyTextClass = 'text-[0.92rem] leading-relaxed text-anna-muted'

const boxClass = closetBoxClass

function BulletList({ items, className = '' }) {
  return (
    <ul className={`m-0 grid list-none gap-2.5 pl-0 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-anna-accent"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function PageHeading({ eyebrow, title, subtitle, titleId }) {
  return (
    <header className="mb-4 sm:mb-6 lg:mb-8">
      {eyebrow && (
        <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-anna-accent">
          {eyebrow}
        </p>
      )}
      <h1
        id={titleId}
        className="anna-diacritics m-0 font-serif text-[clamp(1.35rem,5.5vw,2.35rem)] leading-[1.12] font-light uppercase text-anna-cream"
      >
        {title}
      </h1>
      {subtitle && (
        <p className={`mt-2 mb-0 sm:mt-3 ${bodyTextClass} text-[clamp(0.84rem,3.6vw,0.92rem)]`}>
          {subtitle}
        </p>
      )}
    </header>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Continuar', nextDisabled, isSubmitting, isSubmit }) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-2.5 border-t border-anna-dark/30 pt-4 sm:mt-auto sm:flex-row sm:justify-between sm:gap-3 sm:pt-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center rounded-xl border border-anna-cream/30 px-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-anna-cream transition-colors hover:border-anna-cream hover:bg-anna-dark/20 disabled:opacity-50 sm:h-12 sm:min-w-[140px] sm:w-auto sm:px-6 sm:text-[0.82rem]"
        >
          Volver
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      <button
        type={isSubmit ? 'submit' : 'button'}
        onClick={isSubmit ? undefined : onNext}
        disabled={nextDisabled || isSubmitting}
        aria-busy={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-anna-accent px-4 text-[0.72rem] font-bold leading-tight tracking-[0.08em] text-anna-dark uppercase shadow-[0_8px_24px_rgba(199,135,142,0.35)] transition-all hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:max-w-sm sm:flex-none sm:px-6 sm:text-[0.82rem] sm:tracking-[0.1em]"
      >
        {isSubmitting ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-anna-dark/25 border-t-anna-dark" />
            Enviando...
          </>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  )
}

function RadioCards({ name, options, value, onChange, disabled }) {
  return (
    <div className="grid gap-2.5">
      {options.map((option) => {
        const active = value === option
        return (
          <label
            key={option}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition-all sm:items-center sm:px-4 sm:py-3.5 ${
              active
                ? 'border-anna-accent bg-anna-accent/15 shadow-[inset_0_0_0_1px_rgba(199,135,142,0.4)]'
                : 'border-anna-cream/12 bg-anna-burgundy hover:border-anna-accent/40'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              disabled={disabled}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                active ? 'border-anna-accent bg-anna-accent' : 'border-anna-muted/50'
              }`}
            >
              {active && <span className="size-2 rounded-full bg-anna-dark" />}
            </span>
            <span className="text-[0.84rem] leading-snug text-anna-cream sm:text-[0.9rem]">{option}</span>
          </label>
        )
      })}
    </div>
  )
}

function ChipSelect({ options, values, onToggle, disabled }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = values.includes(option)
        return (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-3 py-1.5 text-[0.74rem] font-semibold transition-all sm:px-3.5 sm:py-2 sm:text-[0.8rem] ${
              active
                ? 'border-anna-cream bg-anna-cream text-anna-dark shadow-sm'
                : 'border-anna-cream/12 bg-anna-burgundy text-anna-cream hover:border-anna-accent/50'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function FormSection({ title, hint, children }) {
  return (
    <section className={`${boxClass} p-3.5 sm:p-4 md:p-5`}>
      <div className="mb-4">
        <h2 className={`m-0 ${sectionTitleClass}`}>{title}</h2>
        {hint && <p className={`mt-1.5 mb-0 ${bodyTextClass} text-[0.85rem]`}>{hint}</p>}
      </div>
      {children}
    </section>
  )
}

function ClosetForm({ step, setStep, form, setForm, isSubmitting, onSubmit }) {
  const titleId = 'closet-form-title'
  const [errors, setErrors] = useState({})

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function attemptStep(validator) {
    const stepErrors = validator(form)
    setErrors(stepErrors)
    if (!hasErrors(stepErrors)) {
      goNext()
    }
  }

  function toggleGarmentType(option) {
    setForm((current) => ({
      ...current,
      garmentTypes: current.garmentTypes.includes(option)
        ? current.garmentTypes.filter((item) => item !== option)
        : [...current.garmentTypes, option],
    }))
    setErrors((current) => {
      if (!current.garmentTypes) return current
      const next = { ...current }
      delete next.garmentTypes
      return next
    })
  }

  function goNext() {
    setErrors({})
    setStep((current) => Math.min(current + 1, STEPS.SUCCESS))
  }

  function goBack() {
    setErrors({})
    setStep((current) => Math.max(current - 1, STEPS.LANDING))
  }

  if (step === STEPS.LANDING) {
    return (
      <div className="flex flex-col">
        <PageHeading
          titleId={titleId}
          title="Quiero vender mi clóset"
          subtitle="¿Tienes prendas que merecen una segunda gran historia?"
        />

        <p className={`m-0 mb-6 ${bodyTextClass}`}>
          Completa un breve formulario de postulación.
        </p>

        <div className={`mb-6 ${boxClass} p-3.5 sm:mb-8 sm:p-4 md:p-5`}>
          <p className={`m-0 mb-3 font-semibold text-anna-cream ${bodyTextClass}`}>
            Al finalizar, conoce:
          </p>
          <BulletList
            items={[
              'Qué prendas buscamos.',
              'Estado esperado.',
              'Marcas de interés.',
              'Consejos para preparar tu clóset.',
            ]}
            className={bodyTextClass}
          />
        </div>

        <NavButtons onNext={goNext} nextLabel="Comenzar postulación" />
      </div>
    )
  }

  if (step === STEPS.INTRO) {
    return (
      <div className="flex flex-col">
        <PageHeading
          titleId={titleId}
          title="Antes de comenzar"
          subtitle="Nos alegra que quieras ser parte de ANNA."
        />

        <p className={`m-0 mb-4 ${bodyTextClass}`}>
          Queremos conocer un poco más sobre ti y sobre las prendas que te gustaría
          vender. Este formulario nos ayudará a entender si tu clóset es un buen
          match para nuestra comunidad.
        </p>

        <p className={`m-0 mb-8 font-semibold text-anna-cream ${bodyTextClass}`}>
          Completarlo te tomará menos de 3 minutos.
        </p>

        <NavButtons onBack={goBack} onNext={goNext} />
      </div>
    )
  }

  if (step === STEPS.ABOUT_YOU) {
    return (
      <div className="flex flex-col">
        <PageHeading titleId={titleId} title="1. Cuéntanos sobre ti" />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <label className="grid gap-2 sm:col-span-2">
            <span className={labelClass}>Nombre y apellido</span>
            <input
              type="text"
              className={inputClassWithError(Boolean(errors.fullName))}
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
            />
            <FieldError message={errors.fullName} />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className={labelClass}>Correo electrónico</span>
            <input
              type="email"
              className={inputClassWithError(Boolean(errors.email))}
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError message={errors.email} />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>WhatsApp (opcional)</span>
            <input
              type="tel"
              className={inputClassWithError(Boolean(errors.whatsapp))}
              value={form.whatsapp}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              placeholder="+56 9 ..."
              aria-invalid={Boolean(errors.whatsapp)}
            />
            <FieldError message={errors.whatsapp} />
          </label>

          <label className="grid gap-2">
            <span className={labelClass}>Instagram (opcional)</span>
            <input
              type="text"
              className={inputClassWithError(Boolean(errors.instagram))}
              value={form.instagram}
              onChange={(e) => updateField('instagram', e.target.value)}
              placeholder="@usuario"
              aria-invalid={Boolean(errors.instagram)}
            />
            <FieldError message={errors.instagram} />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className={labelClass}>Ciudad</span>
            <select
              className={`${inputClassWithError(Boolean(errors.city))} appearance-none`}
              value={form.city}
              onChange={(e) => updateField('city', e.target.value)}
              aria-invalid={Boolean(errors.city)}
            >
              <option value="">Seleccionar ciudad</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <FieldError message={errors.city} />
          </label>
        </div>

        <NavButtons
          onBack={goBack}
          onNext={() => attemptStep(validateAboutYou)}
        />
      </div>
    )
  }

  if (step === STEPS.ABOUT_CLOSET) {
    return (
      <div className="flex flex-col gap-4 sm:gap-5">
        <PageHeading titleId={titleId} title="2. Sobre tu clóset" />

        <FormSection title="¿Cuántas prendas aproximadamente te gustaría vender?">
          <SectionError message={errors.garmentQuantity} />
          <RadioCards
            name="garmentQuantity"
            options={GARMENT_QUANTITY_OPTIONS}
            value={form.garmentQuantity}
            onChange={(value) => updateField('garmentQuantity', value)}
          />
        </FormSection>

        <FormSection
          title="¿Qué tipo de prendas predominan en tu clóset?"
          hint="Puedes seleccionar más de una."
        >
          <SectionError message={errors.garmentTypes} />
          <ChipSelect
            options={GARMENT_TYPE_OPTIONS}
            values={form.garmentTypes}
            onToggle={toggleGarmentType}
          />
        </FormSection>

        <FormSection
          title="¿Qué marcas hay en tu clóset?"
          hint="Ejemplo: Zara, Rapsodia, Bimba y Lola, Prüne, Carolina Herrera."
        >
          <textarea
            className={`min-h-24 w-full resize-y rounded-xl border bg-anna-cream px-4 py-3 text-[0.95rem] text-anna-ink outline-none focus:ring-2 focus:ring-anna-accent/30 ${
              errors.brands
                ? 'border-anna-accent ring-2 ring-anna-accent/30'
                : 'border-anna-dark/80 focus:border-anna-accent'
            }`}
            value={form.brands}
            onChange={(e) => updateField('brands', e.target.value)}
            aria-invalid={Boolean(errors.brands)}
          />
          <FieldError message={errors.brands} />
        </FormSection>

        <FormSection title="¿Cómo describirías el estado general de tus prendas?">
          <SectionError message={errors.condition} />
          <RadioCards
            name="condition"
            options={CONDITION_OPTIONS}
            value={form.condition}
            onChange={(value) => updateField('condition', value)}
          />
        </FormSection>

        <div className="grid gap-5 lg:grid-cols-2">
          <FormSection title="¿Has vendido ropa anteriormente?">
            <SectionError message={errors.previousSales} />
            <RadioCards
              name="previousSales"
              options={PREVIOUS_SALES_OPTIONS}
              value={form.previousSales}
              onChange={(value) => updateField('previousSales', value)}
            />
          </FormSection>

          <FormSection title="¿Estarías dispuesta/o a vender bajo la modalidad de consignación con ANNA?">
            <SectionError message={errors.consignment} />
            <RadioCards
              name="consignment"
              options={CONSIGNMENT_OPTIONS}
              value={form.consignment}
              onChange={(value) => updateField('consignment', value)}
            />
          </FormSection>
        </div>

        <NavButtons
          onBack={goBack}
          onNext={() => attemptStep(validateAboutCloset)}
        />
      </div>
    )
  }

  if (step === STEPS.STORY) {
    return (
      <div className="flex flex-col">
        <PageHeading titleId={titleId} title="Cuéntanos un poco sobre tu clóset" />

        <label className="mb-6 grid gap-2">
          <span className={sectionTitleClass}>
            ¿Qué hace especial a las prendas que quieres vender?
          </span>
          <textarea
            className={`min-h-36 w-full resize-y rounded-2xl border bg-anna-cream px-4 py-4 text-[0.95rem] leading-relaxed text-anna-ink outline-none focus:ring-2 focus:ring-anna-accent/30 sm:min-h-40 ${
              errors.closetStory
                ? 'border-anna-accent ring-2 ring-anna-accent/30'
                : 'border-anna-dark/80 focus:border-anna-accent'
            }`}
            value={form.closetStory}
            onChange={(e) => updateField('closetStory', e.target.value)}
            aria-invalid={Boolean(errors.closetStory)}
          />
          <FieldError message={errors.closetStory} />
        </label>

        <NavButtons
          onBack={goBack}
          onNext={() => attemptStep(validateStory)}
        />
      </div>
    )
  }

  if (step === STEPS.AUTHORIZATION) {
    return (
      <form className="flex flex-col" onSubmit={onSubmit}>
        <PageHeading titleId={titleId} title="Autorizaciones" />

        <div className="grid gap-4">
          <div className={`${boxClass} p-4 sm:p-5`}>
            <p className={`m-0 mb-3 ${sectionTitleClass}`}>
              Tratamiento de datos personales
            </p>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-anna-accent"
                checked={form.dataConsent}
                disabled={isSubmitting}
                onChange={(e) => updateField('dataConsent', e.target.checked)}
                required
              />
              <span className="text-[0.84rem] leading-relaxed text-anna-muted">
                Autorizo a ANNA SpA a recopilar y tratar los datos personales que he
                proporcionado en este formulario con la finalidad de evaluar mi
                postulación como potencial vendedora o vendedor, contactarme respecto
                de este proceso y gestionar mi participación en la comunidad ANNA, de
                conformidad con la legislación vigente sobre protección de datos
                personales. He sido informado(a) de que puedo ejercer mis derechos de
                acceso, rectificación, actualización, oposición, portabilidad,
                cancelación y demás derechos que establezca la ley, de acuerdo con la
                Política de Privacidad de ANNA.
              </span>
            </label>
          </div>

          <div className={`${boxClass} p-4 sm:p-5`}>
            <p className={`m-0 mb-3 ${sectionTitleClass}`}>Comunicaciones de ANNA</p>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-anna-accent"
                checked={form.communicationsConsent}
                disabled={isSubmitting}
                onChange={(e) => updateField('communicationsConsent', e.target.checked)}
                required
              />
              <span className="text-[0.84rem] leading-relaxed text-anna-muted">
                Autorizo a ANNA SpA a enviarme información sobre nuevos ingresos,
                eventos, beneficios, contenido editorial, novedades, campañas,
                invitaciones y otras comunicaciones relacionadas con la comunidad ANNA,
                a través de correo electrónico, WhatsApp, SMS u otros medios
                electrónicos. Entiendo que podré revocar esta autorización y darme de
                baja de estas comunicaciones en cualquier momento.
              </span>
            </label>
          </div>
        </div>

        <NavButtons
          onBack={goBack}
          nextLabel="Quiero que ANNA conozca mi clóset"
          nextDisabled={!form.dataConsent || !form.communicationsConsent}
          isSubmitting={isSubmitting}
          isSubmit
        />
      </form>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-anna-accent/20 text-2xl text-anna-accent">
          ✓
        </div>
        <div>
          <h1
            id={titleId}
            className="anna-diacritics m-0 font-serif text-[clamp(1.5rem,4vw,2rem)] font-light uppercase text-anna-cream"
          >
            ¡Gracias por postular tu clóset!
          </h1>
        </div>
      </div>

      <p className={`m-0 mb-4 ${bodyTextClass}`}>
        Nos encanta conocer personas con quien compartir el gusto por el buen vestir.
      </p>

      <p className={`m-0 mb-4 ${bodyTextClass}`}>
        Revisaremos tu información y, si tu propuesta se alinea con la curaduría de
        ANNA, nos pondremos en contacto contigo para contarte los siguientes pasos.
      </p>

      <p className={`m-0 mb-8 font-semibold text-anna-cream ${bodyTextClass}`}>
        Mientras tanto, te invitamos a conocer qué buscamos para esta etapa en ANNA.
      </p>

      <div className={`mt-8 ${boxClass} p-5 sm:p-6`}>
        <p className={`m-0 mb-4 ${bodyTextClass}`}>
          Ahora queremos contarte qué hace especial a una prenda dentro de ANNA.
        </p>

        <h2 className={`m-0 ${sectionTitleClass}`}>Qué buscamos</h2>
        <p className={`mt-2 mb-4 ${bodyTextClass}`}>
          Buscamos prendas bien cuidadas, con diseño, calidad y una historia que
          merezca continuar.
        </p>

        <p className={`m-0 mb-4 font-semibold text-anna-cream ${bodyTextClass}`}>
          Aquí encontrarás:
        </p>

        <BulletList
          className={`mb-5 ${bodyTextClass}`}
          items={[
            'Las marcas que forman parte de nuestra curaduría (+).',
            'El estado esperado de las prendas (+).',
            'Consejos para preparar tu clóset (+).',
            'Cómo aumentar las posibilidades de ser seleccionada (+).',
          ]}
        />

        <div className="grid gap-3">
          {EXPANDABLE_SECTIONS.map((section) => (
            <ExpandableSection key={section.title} title={section.title}>
              {section.content}
            </ExpandableSection>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-[0.88rem] font-medium text-anna-muted">
        Gracias por querer ser parte de ANNA.
        <br />
        Nos gusta vestir bien.
      </p>
    </div>
  )
}

function getProgressStep(step) {
  if (step <= STEPS.INTRO || step === STEPS.SUCCESS) return -1
  return step - STEPS.ABOUT_YOU
}

export default function ClosetSellerPage() {
  const [step, setStep] = useState(STEPS.LANDING)
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return

    const scriptUrl =
      import.meta.env.VITE_GOOGLE_CLOSET_SCRIPT_URL ||
      import.meta.env.VITE_GOOGLE_SCRIPT_URL

    if (!scriptUrl) {
      console.error('Falta VITE_GOOGLE_SCRIPT_URL en .env')
      alert('Configuración incompleta. Contacta al administrador.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: new URLSearchParams({
          formType: 'closet',
          fullName: form.fullName,
          email: form.email,
          whatsapp: form.whatsapp,
          instagram: form.instagram,
          city: form.city,
          garmentQuantity: form.garmentQuantity,
          garmentTypes: form.garmentTypes.join(', '),
          brands: form.brands,
          condition: form.condition,
          previousSales: form.previousSales,
          consignment: form.consignment,
          closetStory: form.closetStory,
          dataConsent: String(form.dataConsent),
          communicationsConsent: String(form.communicationsConsent),
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
        setStep(STEPS.SUCCESS)
      } else {
        alert('Hubo un error al enviar. Intenta de nuevo.')
      }
    } catch (error) {
      console.error(error)
      alert('Hubo un error. Intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressStep = getProgressStep(step)
  const isSuccess = step === STEPS.SUCCESS

  return (
    <ClosetLayout
      step={progressStep}
      showProgress={progressStep >= 0}
      isSuccess={isSuccess}
    >
      <ClosetForm
        step={step}
        setStep={setStep}
        form={form}
        setForm={setForm}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </ClosetLayout>
  )
}
