export interface LoginDto {
  email: string
  password: string
}

export interface UserCreateDto {
  name: string
  email: string
  photo?: string
  password: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  photo?: string
  createdAt: string
  updatedAt: string
}

export interface RefreshTokenResponse {
  token: string
  refreshToken: string
}
