import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { contactsService } from '@/services'
import type {
  Contact,
  ContactCreateDto,
  ContactUpdateDto,
  ContactsQueryParams,
  PaginatedResponse
} from '@/types'

export const useContactsStore = defineStore('contacts', () => {
  // State
  const contacts = ref<Contact[]>([])
  const favorites = ref<Contact[]>([])
  const currentContact = ref<Contact | null>(null)
  const isLoading = ref(false)
  const isLoadingFavorites = ref(false)
  const error = ref<string | null>(null)

  // Pagination state
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0
  })

  // Search and filters state
  const searchTerm = ref('')
  const orderBy = ref('name')
  const orderDesc = ref(false)

  // Cache timestamps
  const lastFetch = ref<number>(0)
  const lastFavoritesFetch = ref<number>(0)
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

  // Getters
  const isContactsCacheValid = computed(() => {
    return Date.now() - lastFetch.value < CACHE_DURATION
  })

  const isFavoritesCacheValid = computed(() => {
    return Date.now() - lastFavoritesFetch.value < CACHE_DURATION
  })

  const totalContacts = computed(() => pagination.value.total)

  const activeContacts = computed(() => {
    return contacts.value.filter((contact) => contact.isActive)
  })

  const favoriteContacts = computed(() => {
    return contacts.value.filter(
      (contact) => contact.favorite && contact.isActive
    )
  })

  // Actions
  async function fetchContacts(params?: ContactsQueryParams, useCache = true) {
    // Se usar cache e o cache for válido e há dados, retornar dados em cache
    if (
      useCache &&
      isContactsCacheValid.value &&
      contacts.value.length > 0 &&
      !params?.searchTerm &&
      !params?.page
    ) {
      return { data: contacts.value, ...pagination.value }
    }

    try {
      isLoading.value = true
      error.value = null

      const queryParams = {
        searchTerm: params?.searchTerm || searchTerm.value,
        page: params?.page || pagination.value.page,
        pageSize: params?.pageSize || pagination.value.pageSize,
        orderBy: params?.orderBy || orderBy.value,
        orderDesc: params?.orderDesc ?? orderDesc.value
      }

      const response: PaginatedResponse<Contact> =
        await contactsService.getContacts(queryParams)

      // Se for a primeira página ou nova busca, substituir dados
      if (queryParams.page === 1 || params?.searchTerm) {
        contacts.value = response.data
      } else {
        // Caso contrário, adicionar aos dados existentes (paginação)
        contacts.value.push(...response.data)
      }

      // Atualizar cache e metadados de paginação
      contactsService.setCachedContacts(response.data)
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages
      }

      // Atualizar parâmetros de busca
      if (params?.searchTerm !== undefined) searchTerm.value = params.searchTerm
      if (params?.orderBy) orderBy.value = params.orderBy
      if (params?.orderDesc !== undefined) orderDesc.value = params.orderDesc

      lastFetch.value = Date.now()
      return response
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar contatos'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFavorites(useCache = true) {
    if (useCache && isFavoritesCacheValid.value) {
      return favorites.value
    }

    try {
      isLoadingFavorites.value = true
      error.value = null

      const response = await contactsService.getFavorites()
      favorites.value = response
      lastFavoritesFetch.value = Date.now()

      return response
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar favoritos'
      throw err
    } finally {
      isLoadingFavorites.value = false
    }
  }

  async function fetchContactById(uuid: string, useCache = true) {
    // Verificar cache primeiro
    if (useCache) {
      const cached = contactsService.getCachedContact(uuid)
      if (cached) {
        currentContact.value = cached
        return cached
      }
    }

    try {
      isLoading.value = true
      error.value = null

      const contact = await contactsService.getContact(uuid)
      currentContact.value = contact
      contactsService.setCachedContact(contact)

      // Atualizar na lista se existir
      const index = contacts.value.findIndex((c) => c.uuid === uuid)
      if (index >= 0) {
        contacts.value[index] = contact
      }

      return contact
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar contato'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function createContact(contactData: ContactCreateDto) {
    try {
      isLoading.value = true
      error.value = null

      const newContact = await contactsService.createContact(contactData)

      // Adicionar à lista local
      contacts.value.unshift(newContact)
      contactsService.setCachedContact(newContact)

      // Atualizar contador total
      pagination.value.total += 1

      // Invalidar cache para forçar refresh na próxima consulta
      lastFetch.value = Date.now()

      return newContact
    } catch (err: any) {
      error.value = err.message || 'Erro ao criar contato'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateContact(uuid: string, contactData: ContactUpdateDto) {
    try {
      isLoading.value = true
      error.value = null

      const updatedContact = await contactsService.updateContact(
        uuid,
        contactData
      )

      // Atualizar na lista local
      const index = contacts.value.findIndex((c) => c.uuid === uuid)
      if (index >= 0) {
        contacts.value[index] = updatedContact
      }

      // Atualizar contato atual se for o mesmo
      if (currentContact.value?.uuid === uuid) {
        currentContact.value = updatedContact
      }

      contactsService.setCachedContact(updatedContact)

      return updatedContact
    } catch (err: any) {
      error.value = err.message || 'Erro ao atualizar contato'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteContact(uuid: string) {
    try {
      isLoading.value = true
      error.value = null

      await contactsService.deleteContact(uuid)

      // Remover da lista local
      const index = contacts.value.findIndex((c) => c.uuid === uuid)
      if (index >= 0) {
        contacts.value.splice(index, 1)
        pagination.value.total -= 1
      }

      // Limpar contato atual se for o mesmo
      if (currentContact.value?.uuid === uuid) {
        currentContact.value = null
      }

      contactsService.removeCachedContact(uuid)
    } catch (err: any) {
      error.value = err.message || 'Erro ao deletar contato'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function toggleFavorite(uuid: string) {
    try {
      const updatedContact = await contactsService.toggleFavorite(uuid)

      // Atualizar na lista local
      const index = contacts.value.findIndex((c) => c.uuid === uuid)
      if (index >= 0) {
        contacts.value[index] = updatedContact
      }

      // Atualizar contato atual se for o mesmo
      if (currentContact.value?.uuid === uuid) {
        currentContact.value = updatedContact
      }

      contactsService.setCachedContact(updatedContact)

      // Forçar atualização de cache para refletir mudanças imediatamente
      lastFavoritesFetch.value = 0
      lastFetch.value = Date.now() // Atualizar timestamp para manter cache válido

      return updatedContact
    } catch (err: any) {
      error.value = err.message || 'Erro ao alterar favorito'
      throw err
    }
  }

  async function toggleStatus(uuid: string) {
    try {
      const updatedContact = await contactsService.toggleStatus(uuid)

      // Atualizar na lista local
      const index = contacts.value.findIndex((c) => c.uuid === uuid)
      if (index >= 0) {
        contacts.value[index] = updatedContact
      }

      // Atualizar contato atual se for o mesmo
      if (currentContact.value?.uuid === uuid) {
        currentContact.value = updatedContact
      }

      contactsService.setCachedContact(updatedContact)

      // Forçar atualização de cache para refletir mudanças de status
      lastFetch.value = Date.now()
      lastFavoritesFetch.value = 0 // Favoritos podem mudar se status mudou

      return updatedContact
    } catch (err: any) {
      error.value = err.message || 'Erro ao alterar status'
      throw err
    }
  }

  function clearError() {
    error.value = null
  }

  function clearCache() {
    contacts.value = []
    favorites.value = []
    currentContact.value = null
    lastFetch.value = 0
    lastFavoritesFetch.value = 0
    contactsService.clearCache()

    // Reset pagination
    pagination.value = {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0
    }

    // Reset filters
    searchTerm.value = ''
    orderBy.value = 'name'
    orderDesc.value = false
  }

  function setCurrentContact(contact: Contact | null) {
    currentContact.value = contact
  }

  function invalidateCache() {
    lastFetch.value = 0
    lastFavoritesFetch.value = 0
  }

  async function refreshContacts() {
    return fetchContacts(undefined, false) // Força busca sem usar cache
  }

  return {
    // State
    contacts,
    favorites,
    currentContact,
    isLoading,
    isLoadingFavorites,
    error,
    pagination,
    searchTerm,
    orderBy,
    orderDesc,

    // Getters
    isContactsCacheValid,
    isFavoritesCacheValid,
    totalContacts,
    activeContacts,
    favoriteContacts,

    // Actions
    fetchContacts,
    fetchFavorites,
    fetchContactById,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    toggleStatus,
    clearError,
    clearCache,
    setCurrentContact,
    invalidateCache,
    refreshContacts
  }
})
