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
    isAuthenticated: authStore.isAuthenticated,
    userName: authStore.userName,
    userEmail: authStore.userEmail,
    userPhoto: authStore.userPhoto,

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    updateProfile: authStore.updateProfile,
    deleteAccount: authStore.deleteAccount,
    clearError: authStore.clearError,
    initialize: authStore.initialize
  }
}

// Composable específico para contatos
export function useContacts() {
  const contactsStore = useContactsStore()

  return {
    // State
    contacts: contactsStore.contacts,
    favorites: contactsStore.favorites,
    currentContact: contactsStore.currentContact,
    isLoading: contactsStore.isLoading,
    isLoadingFavorites: contactsStore.isLoadingFavorites,
    error: contactsStore.error,
    pagination: contactsStore.pagination,
    searchTerm: contactsStore.searchTerm,
    orderBy: contactsStore.orderBy,
    orderDesc: contactsStore.orderDesc,

    // Getters
    totalContacts: contactsStore.totalContacts,
    activeContacts: contactsStore.activeContacts,
    favoriteContacts: contactsStore.favoriteContacts,

    // Actions
    fetchContacts: contactsStore.fetchContacts,
    fetchFavorites: contactsStore.fetchFavorites,
    fetchContactById: contactsStore.fetchContactById,
    createContact: contactsStore.createContact,
    updateContact: contactsStore.updateContact,
    deleteContact: contactsStore.deleteContact,
    toggleFavorite: contactsStore.toggleFavorite,
    toggleStatus: contactsStore.toggleStatus,
    clearError: contactsStore.clearError,
    setCurrentContact: contactsStore.setCurrentContact
  }
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
