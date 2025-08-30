export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  searchTerm?: string
  orderBy?: string
  orderDesc?: boolean
}
