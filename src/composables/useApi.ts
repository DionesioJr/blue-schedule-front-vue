import { useAuthStore, useContactsStore, useUsersStore } from '@/stores'
import { authService, contactsService, usersService } from '@/services'

// Composable para facilitar o uso dos stores e services
export function useApi() {
  const authStore = useAuthStore()
  const contactsStore = useContactsStore()
  const usersStore = useUsersStore()

  return {
    // Stores
    auth: authStore,
    contacts: contactsStore,
    users: usersStore,

    // Services (para uso direto quando necessário)
    authService,
    contactsService,
    usersService
  }
}

// Composable específico para autenticação
export function useAuth() {
  const authStore = useAuthStore()

  return {
    // State
    user: authStore.user,
    isLoading: authStore.isLoading,
    error: authStore.error,
    validationErrors: authStore.validationErrors,
    isAuthenticated: authStore.isAuthenticated,
    userName: authStore.userName,
    userEmail: authStore.userEmail,
    userPhoto: authStore.userPhoto,

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    loadUserProfile: authStore.loadUserProfile,
    updateProfile: authStore.updateProfile,
    deleteAccount: authStore.deleteAccount,
    clearError: authStore.clearError,
    initialize: authStore.initialize
  }
}

// Composable específico para contatos
export function useContacts() {
  // Retornar o store diretamente para manter a reatividade
  return useContactsStore()
}

// Composable específico para usuários
export function useUsers() {
  const usersStore = useUsersStore()

  return {
    // State
    profile: usersStore.profile,
    isLoading: usersStore.isLoading,
    error: usersStore.error,

    // Getters
    userName: usersStore.userName,
    userEmail: usersStore.userEmail,
    userPhoto: usersStore.userPhoto,
    userId: usersStore.userId,

    // Actions
    fetchProfile: usersStore.fetchProfile,
    updateProfile: usersStore.updateProfile,
    deleteProfile: usersStore.deleteProfile,
    uploadProfilePhoto: usersStore.uploadProfilePhoto,
    getUserById: usersStore.getUserById,
    clearError: usersStore.clearError
  }
}
