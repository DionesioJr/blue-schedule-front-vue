import apiService from './api'
import type {
  LoginDto,
  UserCreateDto,
  AuthResponse,
  RefreshTokenResponse
} from '@/types'

class AuthService {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/api/auth/login',
      credentials
    )

    // Salvar tokens no localStorage
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    return response
  }

  async register(userData: UserCreateDto): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/api/auth/register',
      userData
    )

    // Salvar tokens no localStorage se existirem
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    return response
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await apiService.post<RefreshTokenResponse>(
      '/api/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    )

    // Atualizar tokens no localStorage
    if (response.token) {
      localStorage.setItem('token', response.token)
    }
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken)
    }

    return response
  }

  async revoke(): Promise<void> {
    try {
      await apiService.post('/api/auth/revoke')
    } finally {
      // Limpar tokens independentemente do resultado
      this.logout()
    }
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      // Verificar se o token não está expirado (simples verificação)
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000

      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  async deleteAccount(): Promise<void> {
    try {
      await apiService.delete('/api/auth/account')

      this.logout()
    } catch (error) {
      console.error('Erro ao excluir conta:', error)
      throw error
    }
  }
}

export const authService = new AuthService()
export default authService
