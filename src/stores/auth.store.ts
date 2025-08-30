import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, usersService } from '@/services'
import type { LoginDto, UserCreateDto, User, AuthResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => {
    return !!user.value && authService.isAuthenticated()
  })

  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')
  const userPhoto = computed(() => user.value?.photo)

  // Actions
  async function login(credentials: LoginDto) {
    try {
      isLoading.value = true
      error.value = null

      const response: AuthResponse = await authService.login(credentials)
      user.value = response.user

      return response
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer login'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: UserCreateDto) {
    try {
      isLoading.value = true
      error.value = null

      const response: AuthResponse = await authService.register(userData)
      user.value = response.user

      return response
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar conta'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      isLoading.value = true
      await authService.revoke()
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    } finally {
      user.value = null
      error.value = null
      isLoading.value = false
      // Limpar cache dos outros stores
      const { useContactsStore } = await import('./contacts.store')
      const { useUsersStore } = await import('./users.store')
      useContactsStore().clearCache()
      useUsersStore().clearCache()
    }
  }

  async function refreshToken() {
    try {
      await authService.refreshToken()
      // Recarregar dados do usuário após refresh
      await loadUserProfile()
    } catch (err: any) {
      console.error('Erro ao atualizar token:', err)
      await logout()
      throw err
    }
  }

  async function loadUserProfile() {
    if (!isAuthenticated.value) return

    try {
      const profile = await usersService.getProfile()
      user.value = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        photo: profile.photo,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    } catch (err: any) {
      console.error('Erro ao carregar perfil:', err)
      if (err.status === 401) {
        await logout()
      }
    }
  }

  async function updateProfile(userData: { name?: string; photo?: string }) {
    try {
      isLoading.value = true
      error.value = null

      const updatedProfile = await usersService.updateProfile(userData)

      // Atualizar dados do usuário no store
      if (user.value) {
        user.value.name = updatedProfile.name
        user.value.photo = updatedProfile.photo
        user.value.updatedAt = updatedProfile.updatedAt
      }

      return updatedProfile
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar perfil'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteAccount() {
    try {
      isLoading.value = true
      error.value = null

      await usersService.deleteProfile()
      await logout()
    } catch (err: any) {
      error.value = err.message || 'Erro ao deletar conta'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Inicialização automática
  async function initialize() {
    if (authService.isAuthenticated()) {
      await loadUserProfile()
    }
  }

  return {
    // State
    user,
    isLoading,
    error,

    // Getters
    isAuthenticated,
    userName,
    userEmail,
    userPhoto,

    // Actions
    login,
    register,
    logout,
    refreshToken,
    loadUserProfile,
    updateProfile,
    deleteAccount,
    clearError,
    initialize
  }
})
