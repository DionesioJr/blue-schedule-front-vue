import apiService from './api'
import type { UserProfile, UserUpdateDto } from '@/types'

class UsersService {
  async getProfile(): Promise<UserProfile> {
    return await apiService.get<UserProfile>('/api/users/profile')
  }

  async updateProfile(userData: UserUpdateDto): Promise<UserProfile> {
    return await apiService.put<UserProfile>('/api/users/profile', userData)
  }

  async deleteProfile(): Promise<void> {
    await apiService.delete('/api/users/profile')
  }

  async getUserById(uuid: string): Promise<UserProfile> {
    return await apiService.get<UserProfile>(`/api/users/${uuid}`)
  }

  // Método para upload de foto de perfil
  async uploadProfilePhoto(file: File): Promise<{ photoUrl: string }> {
    const formData = new FormData()
    formData.append('photo', file)

    return await apiService.upload<{ photoUrl: string }>(
      '/api/users/profile/photo',
      formData
    )
  }

  // Cache local para o perfil do usuário
  private profileCache: UserProfile | null = null
  private cacheTimestamp: number = 0
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutos

  isCacheValid(): boolean {
    return Date.now() - this.cacheTimestamp < this.CACHE_DURATION
  }

  getCachedProfile(): UserProfile | null {
    if (this.isCacheValid()) {
      return this.profileCache
    }
    return null
  }

  setCachedProfile(profile: UserProfile): void {
    this.profileCache = profile
    this.cacheTimestamp = Date.now()
  }

  clearCache(): void {
    this.profileCache = null
    this.cacheTimestamp = 0
  }
}

export const usersService = new UsersService()
export default usersService
