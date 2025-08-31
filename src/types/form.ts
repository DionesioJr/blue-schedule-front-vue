import type { Contact, ContactCreateDto, ContactUpdateDto } from './contacts'

// Tipo unificado para formulários de contato
export interface ContactForm {
  uuid?: string | number
  name: string
  email?: string
  phone?: string
  photo?: string | null
  favorite: boolean
  isActive: boolean
}

// Funções utilitárias para conversão de tipos
export const contactToForm = (contact: Contact): ContactForm => ({
  uuid: contact.uuid,
  name: contact.name,
  email: contact.email,
  phone: contact.phone,
  photo: contact.photo || null,
  favorite: contact.favorite,
  isActive: contact.isActive
})

export const formToCreateDto = (form: ContactForm): ContactCreateDto => ({
  name: form.name,
  email: form.email,
  phone: form.phone,
  photo: form.photo || undefined,
  favorite: form.favorite,
  isActive: form.isActive
})

export const formToUpdateDto = (form: ContactForm): ContactUpdateDto => ({
  name: form.name,
  email: form.email,
  phone: form.phone,
  photo: form.photo || undefined,
  favorite: form.favorite,
  isActive: form.isActive
})
