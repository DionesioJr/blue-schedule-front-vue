import type { LoginDto, UserCreateDto } from '@/types'

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateLogin = (data: LoginDto): ValidationResult => {
  const errors: Record<string, string> = {}

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido'
  }

  if (!data.password || !data.password.trim()) {
    errors.password = 'Senha é obrigatória'
  } else if (data.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateRegister = (data: UserCreateDto): ValidationResult => {
  const errors: Record<string, string> = {}

  if (!data.name || !data.name.trim()) {
    errors.name = 'Nome é obrigatório'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  } else if (data.name.trim().length > 100) {
    errors.name = 'Nome deve ter no máximo 100 caracteres'
  }

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email é obrigatório'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email inválido'
  }

  if (!data.password || !data.password.trim()) {
    errors.password = 'Senha é obrigatória'
  } else if (data.password.length < 6) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
  } else if (data.password.length > 50) {
    errors.password = 'Senha deve ter no máximo 50 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
