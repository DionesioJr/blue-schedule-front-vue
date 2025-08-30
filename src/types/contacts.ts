export interface Contact {
  id: string
  photo?: string
  name: string
  email?: string
  phone?: string
  favorite: boolean
  isActive: boolean
  isDeleted: boolean
  deletedAt?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface ContactCreateDto {
  photo?: string
  name: string
  email?: string
  phone?: string
  favorite: boolean
}

export interface ContactUpdateDto {
  photo?: string
  name?: string
  email?: string
  phone?: string
  favorite?: boolean
}

export interface ContactsQueryParams {
  searchTerm?: string
  page?: number
  pageSize?: number
  orderBy?: string
  orderDesc?: boolean
}
