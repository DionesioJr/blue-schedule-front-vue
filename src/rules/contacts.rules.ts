import type { ContactCreateDto, ContactUpdateDto, ContactForm } from '@/types'
import type { ValidationResult } from './auth.rules'

export const validateContactForm = (data: ContactForm): ValidationResult => {
  const errors: Record<string, string> = {}

  if (!data.name || !data.name.trim()) {
    errors.name = 'Nome é obrigatório'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Nome deve ter no máximo 100 caracteres'
  }

  if (data.email && data.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Email inválido'
    } else if (data.email.length > 150) {
      errors.email = 'Email deve ter no máximo 150 caracteres'
    }
  }

  if (data.phone && data.phone.trim()) {
    const phonePattern = /^[\d\s\-\(\)]{10,15}$/
    if (!phonePattern.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Telefone inválido'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateContactCreate = (
  data: ContactCreateDto
): ValidationResult => {
  return validateContactForm({
    name: data.name || '',
    email: data.email,
    phone: data.phone,
    photo: data.photo,
    favorite: data.favorite || false,
    isActive: data.isActive ?? true
  })
}

export const validateContactUpdate = (
  data: ContactUpdateDto
): ValidationResult => {
  return validateContactForm({
    name: data.name || '',
    email: data.email,
    phone: data.phone,
    photo: data.photo,
    favorite: data.favorite || false,
    isActive: data.isActive ?? true
  })
}
