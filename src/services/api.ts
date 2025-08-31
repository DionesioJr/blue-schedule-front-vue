import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiError } from '@/types'

class ApiService {
  private api: AxiosInstance
  private baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor para adicionar token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await this.handleUnauthorized()
        }
        return Promise.reject(this.handleError(error))
      }
    )
  }

  private getToken(): string | null {
    return localStorage.getItem('token')
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  }

  private async handleUnauthorized(): Promise<void> {
    const refreshToken = this.getRefreshToken()
    if (refreshToken) {
      try {
        const response = await axios.post(
          `${this.baseURL}/api/auth/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            timeout: 10000
          }
        )

        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken)
          }
        }
      } catch {
        this.clearTokens()
        window.location.href = '/login'
      }
    } else {
      this.clearTokens()
      window.location.href = '/login'
    }
  }

  private clearTokens(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: 'Ocorreu um erro inesperado',
      status: error.response?.status || 500
    }

    if (error.response?.data) {
      const data = error.response.data as any
      apiError.message = data.message || data.error || apiError.message
      apiError.errors = data.errors
    } else if (error.message) {
      apiError.message = error.message
    }

    return apiError
  }

  // Métodos HTTP públicos
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  // Método para upload de arquivos
  async upload<T>(url: string, formData: FormData): Promise<T> {
    const response = await this.api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }
}

export const apiService = new ApiService()
export default apiService
