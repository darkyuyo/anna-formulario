const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_PATTERN = /^[\p{L}\s'.-]+$/u
const INSTAGRAM_PATTERN = /^[a-zA-Z0-9._]{1,30}$/

export function validateFullName(value) {
  const trimmed = value.trim()
  if (trimmed.length < 3) return false
  if (!NAME_PATTERN.test(trimmed)) return false
  return trimmed.split(/\s+/).filter(Boolean).length >= 2
}

export function validateEmail(value) {
  return EMAIL_PATTERN.test(value.trim())
}

export function validateWhatsApp(value) {
  const trimmed = value.trim()
  if (!trimmed) return true

  const digits = trimmed.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 15
}

export function validateInstagram(value) {
  const trimmed = value.trim()
  if (!trimmed) return true

  const handle = trimmed.replace(/^@/, '')
  return INSTAGRAM_PATTERN.test(handle)
}

export function validateAboutYou(form) {
  const errors = {}

  if (!validateFullName(form.fullName)) {
    errors.fullName = 'Ingresa tu nombre y apellido completos.'
  }

  if (!validateEmail(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!validateWhatsApp(form.whatsapp)) {
    errors.whatsapp = 'Ingresa un número de WhatsApp válido (mínimo 8 dígitos).'
  }

  if (!validateInstagram(form.instagram)) {
    errors.instagram = 'Ingresa un usuario de Instagram válido (ej: @usuario).'
  }

  if (!form.city) {
    errors.city = 'Selecciona una ciudad.'
  }

  return errors
}

export function validateAboutCloset(form) {
  const errors = {}

  if (!form.garmentQuantity) {
    errors.garmentQuantity = 'Selecciona una cantidad de prendas.'
  }

  if (form.garmentTypes.length === 0) {
    errors.garmentTypes = 'Selecciona al menos un tipo de prenda.'
  }

  if (!form.brands.trim()) {
    errors.brands = 'Indica al menos algunas marcas de tu clóset.'
  }

  if (!form.condition) {
    errors.condition = 'Selecciona el estado general de tus prendas.'
  }

  if (!form.previousSales) {
    errors.previousSales = 'Indica si has vendido ropa anteriormente.'
  }

  if (!form.consignment) {
    errors.consignment = 'Selecciona una opción de consignación.'
  }

  return errors
}

export function validateStory(form) {
  const errors = {}
  const trimmed = form.closetStory.trim()

  if (!trimmed) {
    errors.closetStory = 'Este campo es obligatorio.'
  }

  return errors
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}
