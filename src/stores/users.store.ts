import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usersService } from '@/services'
import type { UserProfile, UserUpdateDto } from '@/types'

export const useUsersStore = defineStore('users', () => {
  // State
  const profile = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Cache timestamp
  const lastProfileFetch = ref<number>(0)
  const CACHE_DURATION = 10 * 60 * 1000 // 10 minutos

  // Getters
  const isProfileCacheValid = computed(() => {
    return Date.now() - lastProfileFetch.value < CACHE_DURATION
  })

  const userName = computed(() => profile.value?.name || '')
  const userEmail = computed(() => profile.value?.email || '')
  const userPhoto = computed(() => profile.value?.photo)
  const userId = computed(() => profile.value?.id)

  // Actions
  async function fetchProfile(useCache = true) {
    // Verificar cache primeiro
    if (useCache && isProfileCacheValid.value && profile.value) {
      return profile.value
    }

    // Verificar cache do service
    if (useCache) {
      const cachedProfile = usersService.getCachedProfile()
      if (cachedProfile) {
        profile.value = cachedProfile
        return cachedProfile
      }
    }

    try {
      isLoading.value = true
      error.value = null

      const userProfile = await usersService.getProfile()
      profile.value = userProfile

      // Atualizar cache do service
      usersService.setCachedProfile(userProfile)
      lastProfileFetch.value = Date.now()

      return userProfile
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar perfil'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(userData: UserUpdateDto) {
    try {
      isLoading.value = true
      error.value = null

      const updatedProfile = await usersService.updateProfile(userData)
      profile.value = updatedProfile

      // Atualizar cache do service
      usersService.setCachedProfile(updatedProfile)
      lastProfileFetch.value = Date.now()

      return updatedProfile
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar perfil'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProfile() {
    try {
      isLoading.value = true
      error.value = null

      await usersService.deleteProfile()

      // Limpar dados locais
      profile.value = null
      clearCache()
    } catch (err: any) {
      error.value = err.message || 'Erro ao deletar perfil'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function uploadProfilePhoto(file: File) {
    try {
      isLoading.value = true
      error.value = null

      const response = await usersService.uploadProfilePhoto(file)

      // Atualizar foto no perfil local
      if (profile.value) {
        profile.value.photo = response.photoUrl
        profile.value.updatedAt = new Date().toISOString()

        // Atualizar cache do service
        usersService.setCachedProfile(profile.value)
        lastProfileFetch.value = Date.now()
      }

      return response
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer upload da foto'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function getUserById(uuid: string) {
    try {
      isLoading.value = true
      error.value = null

      const user = await usersService.getUserById(uuid)
      return user
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar usuário'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function clearCache() {
    profile.value = null
    lastProfileFetch.value = 0
    usersService.clearCache()
  }

  function setProfile(userProfile: UserProfile) {
    profile.value = userProfile
    usersService.setCachedProfile(userProfile)
    lastProfileFetch.value = Date.now()
  }

  // Método para sincronizar com auth store
  function syncWithAuthStore(authUser: any) {
    if (authUser && (!profile.value || profile.value.id !== authUser.id)) {
      const userProfile: UserProfile = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        photo: authUser.photo,
        createdAt: authUser.createdAt,
        updatedAt: authUser.updatedAt
      }
      setProfile(userProfile)
    }
  }

  return {
    // State
    profile,
    isLoading,
    error,

    // Getters
    isProfileCacheValid,
    userName,
    userEmail,
    userPhoto,
    userId,

    // Actions
    fetchProfile,
    updateProfile,
    deleteProfile,
    uploadProfilePhoto,
    getUserById,
    clearError,
    clearCache,
    setProfile,
    syncWithAuthStore
  }
})
