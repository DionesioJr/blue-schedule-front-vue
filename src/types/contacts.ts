export interface Contact {
  uuid: string
  photo?: string | null
  name: string
  email?: string
  phone?: string
  favorite: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactCreateDto {
  photo?: string
  name: string
  email?: string
  phone?: string
  favorite: boolean
  isActive?: boolean
}

export interface ContactUpdateDto {
  photo?: string
  name?: string
  email?: string
  phone?: string
  favorite?: boolean
  isActive?: boolean
}

export interface ContactsQueryParams {
  searchTerm?: string
  page?: number
  pageSize?: number
  orderBy?: string
  orderDesc?: boolean
}
