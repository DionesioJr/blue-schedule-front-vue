import apiService from './api'
import type {
  Contact,
  ContactCreateDto,
  ContactUpdateDto,
  ContactsQueryParams,
  PaginatedResponse
} from '@/types'

class ContactsService {
  async getContacts(
    params?: ContactsQueryParams
  ): Promise<PaginatedResponse<Contact>> {
    const searchParams = new URLSearchParams()

    if (params?.searchTerm) searchParams.set('SearchTerm', params.searchTerm)
    if (params?.page !== undefined)
      searchParams.set('Page', params.page.toString())
    if (params?.pageSize !== undefined)
      searchParams.set('PageSize', params.pageSize.toString())
    if (params?.orderBy) searchParams.set('OrderBy', params.orderBy)
    if (params?.orderDesc !== undefined)
      searchParams.set('OrderDesc', params.orderDesc.toString())

    const query = searchParams.toString()
    const url = query ? `/api/contacts?${query}` : '/api/contacts'

    return await apiService.get<PaginatedResponse<Contact>>(url)
  }

  async getContact(uuid: string): Promise<Contact> {
    return await apiService.get<Contact>(`/api/contacts/${uuid}`)
  }

  async createContact(contactData: ContactCreateDto): Promise<Contact> {
    return await apiService.post<Contact>('/api/contacts', contactData)
  }

  async updateContact(
    uuid: string,
    contactData: ContactUpdateDto
  ): Promise<Contact> {
    return await apiService.put<Contact>(`/api/contacts/${uuid}`, contactData)
  }

  async deleteContact(uuid: string): Promise<void> {
    await apiService.delete(`/api/contacts/${uuid}`)
  }

  async toggleFavorite(uuid: string): Promise<Contact> {
    return await apiService.patch<Contact>(`/api/contacts/${uuid}/favorite`)
  }

  async toggleStatus(uuid: string): Promise<Contact> {
    return await apiService.patch<Contact>(`/api/contacts/${uuid}/status`)
  }

  async getFavorites(): Promise<Contact[]> {
    return await apiService.get<Contact[]>('/api/contacts/favorites')
  }

  // Métodos de cache local para otimização
  private contactsCache = new Map<string, Contact>()
  private cacheTimestamp: number = 0
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

  isCacheValid(): boolean {
    return Date.now() - this.cacheTimestamp < this.CACHE_DURATION
  }

  getCachedContact(uuid: string): Contact | undefined {
    return this.contactsCache.get(uuid)
  }

  setCachedContact(contact: Contact): void {
    this.contactsCache.set(contact.uuid, contact)
  }

  setCachedContacts(contacts: Contact[]): void {
    contacts.forEach((contact) => this.setCachedContact(contact))
    this.cacheTimestamp = Date.now()
  }

  clearCache(): void {
    this.contactsCache.clear()
    this.cacheTimestamp = 0
  }

  removeCachedContact(uuid: string): void {
    this.contactsCache.delete(uuid)
  }
}

export const contactsService = new ContactsService()
export default contactsService
