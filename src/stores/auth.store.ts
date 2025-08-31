import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, usersService } from '@/services'
import type { LoginDto, UserCreateDto, User, AuthResponse } from '@/types'
import { validateLogin, validateRegister } from '@/rules'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const validationErrors = ref<Record<string, string>>({})

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
      validationErrors.value = {}

      // Validação usando rules
      const validation = validateLogin(credentials)
      if (!validation.isValid) {
        validationErrors.value = validation.errors
        throw new Error('Dados inválidos')
      }

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
      validationErrors.value = {}

      // Validação usando rules
      const validation = validateRegister(userData)
      if (!validation.isValid) {
        validationErrors.value = validation.errors
        throw new Error('Dados inválidos')
      }

      const response: AuthResponse = await authService.register(userData)
      user.value = response.user

      return response
    } catch (err: any) {
      // Capturar mensagem específica da API
      const apiMessage = err.message || 'Erro ao criar conta'
      error.value = apiMessage

      // Criar erro com a mensagem da API para que o componente possa usar
      const customError = new Error(apiMessage)
      throw customError
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
      authService.logout()
      user.value = null
      error.value = null
      isLoading.value = false
      // Limpar cache dos outros stores apenas no logout
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
    validationErrors.value = {}
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
    validationErrors,

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
