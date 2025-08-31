<template>
  <Card class="shadow-sm border border-surface-200">
    <template #content>
      <!-- Search and Filters -->
      <ContactsFilter
        v-model:searchTerm="searchTerm"
        v-model:showFavoritesOnly="showFavoritesOnly"
        v-model:showActiveOnly="showActiveOnly"
        @search="onSearch"
      />

      <!-- Mobile View - Minimal List -->
      <ContactsMobileList
        :contacts="filteredContacts"
        :loading="false"
        :totalRecords="totalRecords"
        @edit="editContact"
        @toggleFavorite="handleToggleFavorite"
      />

      <!-- Desktop View - Full DataTable -->
      <ContactsDesktopTable
        :contacts="filteredContacts"
        :loading="false"
        :totalRecords="totalRecords"
        @edit="editContact"
        @delete="deleteContact"
        @toggleFavorite="handleToggleFavorite"
        @page="onPage"
        @sort="onSort"
        @actionMenu="toggleActionMenu"
      />
    </template>
  </Card>

  <!-- Context Menu for Actions -->
  <Menu ref="actionMenu" :model="currentActionItems" :popup="true" />

  <!-- Diálogos de edição e exclusão -->
  <EditContactDialog
    v-model:visible="showEditDialog"
    :contact="selectedContact"
  />

  <DeleteContactDialog
    v-model:visible="showDeleteDialog"
    :contact="contactToDelete"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

defineOptions({
  name: 'ContactsTable'
})
import { useToast } from 'primevue/usetoast'

import Card from 'primevue/card'
import Menu from 'primevue/menu'

import ContactsFilter from './ContactsFilter.vue'
import ContactsMobileList from './ContactsMobileList.vue'
import ContactsDesktopTable from './ContactsDesktopTable.vue'
import EditContactDialog from './EditContactDialog.vue'
import DeleteContactDialog from './DeleteContactDialog.vue'

import type { Contact, ContactUpdateDto } from '../../../types'
import { useContactsStore } from '../../../stores/contacts.store'

import { useContacts } from '../../../composables/useApi'

const { updateContact } = useContacts()

// Acessar o store diretamente
console.log('Inicializando useContactsStore...')
const contactsStore = useContactsStore()
console.log('contactsStore inicializado:', contactsStore)

// Estado local do componente
const searchTerm = ref('')
const showFavoritesOnly = ref(false)
const showActiveOnly = ref(false)
const totalRecords = computed(() => {
  // Verificar se totalContacts existe
  return contactsStore.totalContacts || 0
})
const actionMenu = ref()
const currentActionItems = ref<
  { label: string; icon: string; command: () => void }[]
>([])

// Carregar contatos ao montar o componente
const toast = useToast()

onMounted(async () => {
  console.log('ContactsTable montado, carregando contatos...')
  try {
    // Carregar contatos iniciais usando o store
    console.log('Chamando fetchContacts...')
    const response = await contactsStore.fetchContacts({}, false) // Forçar não usar cache
    console.log('Resposta de fetchContacts:', response)

    // Verificar estado após a chamada
    console.log('Contatos carregados:', response.data.length)
    console.log('Contatos:', JSON.stringify(response.data))
    console.log('Filtered Contatos:', JSON.stringify(filteredContacts.value))

    // Imprimir o store para debug
    console.log('Todo o store:', contactsStore)
  } catch (err) {
    console.error('Erro ao carregar contatos:', err)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar os contatos',
      life: 5000
    })
  }
})

// Filtrar contatos com base em critérios locais
const filteredContacts = computed(() => {
  // Usar contactsStore diretamente
  let filtered = contactsStore.contacts || []

  // Favorites filter (aplicado localmente)
  if (showFavoritesOnly.value) {
    filtered = filtered.filter((contact: Contact) => contact.favorite)
  }

  // Active filter (aplicado localmente)
  if (showActiveOnly.value) {
    filtered = filtered.filter((contact: Contact) => contact.isActive)
  }

  return filtered
})

const toggleActionMenu = (event: Event, contact: Contact) => {
  currentActionItems.value = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => editContact(contact)
    },
    {
      label: 'Excluir',
      icon: 'pi pi-trash',
      command: () => deleteContact(contact)
    }
  ]
  actionMenu.value.toggle(event)
}

const onSearch = async () => {
  // Atualizar termo de busca e recarregar dados usando o store
  try {
    console.log('Buscando com termo:', searchTerm.value)
    const result = await contactsStore.fetchContacts({
      searchTerm: searchTerm.value,
      page: 1 // Voltar para a primeira página ao buscar
    })
    console.log('Resultado da busca:', result)
    console.log('Contatos após busca:', contactsStore.contacts)
  } catch (error) {
    console.error('Erro ao buscar contatos:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível realizar a busca',
      life: 5000
    })
  }
}

// Estas funções não são mais necessárias, pois são manipuladas pelo componente ContactsFilter

// Referências para os diálogos
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const selectedContact = ref<Contact | null>(null)
const contactToDelete = ref<Contact | null>(null)

const editContact = (contact: Contact) => {
  selectedContact.value = { ...contact }
  showEditDialog.value = true
}

const deleteContact = (contact: Contact) => {
  contactToDelete.value = contact
  showDeleteDialog.value = true
}

const handleToggleFavorite = async (contact: Contact) => {
  try {
    // Salvar o estado atual antes de atualizar
    const wasFavorite = contact.favorite
    const contactName = contact.name

    contact.favorite = !contact.favorite

    const updatedContactStore = await updateContact(
      contact.uuid,
      contact as ContactUpdateDto
    )
    console.log('Contato atualizado:', updatedContactStore)

    // Mostrar toast de sucesso
    toast.add({
      severity: 'success',
      summary: wasFavorite
        ? 'Removido dos favoritos'
        : 'Adicionado aos favoritos',
      detail: `${contactName} foi ${wasFavorite ? 'removido dos' : 'adicionado aos'} favoritos`,
      life: 3000
    })
  } catch (error) {
    console.error('Erro ao atualizar favorito:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível atualizar favorito',
      life: 5000
    })
  }
}

const onPage = async (event: any) => {
  // Implementar lógica de paginação usando o store
  try {
    console.log('Paginando para:', event.page + 1, 'tamanho:', event.rows)
    const result = await contactsStore.fetchContacts({
      page: event.page + 1,
      pageSize: event.rows
    })
    console.log('Resultado da paginação:', result)
    console.log('Contatos após paginação:', contactsStore.contacts)
  } catch (error) {
    console.error('Erro ao paginar contatos:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar a página solicitada',
      life: 5000
    })
  }
}

const onSort = async (event: any) => {
  // Implementar lógica de ordenação usando o store
  try {
    console.log(
      'Ordenando por:',
      event.sortField,
      'direção:',
      event.sortOrder === -1 ? 'DESC' : 'ASC'
    )
    const result = await contactsStore.fetchContacts({
      orderBy: event.sortField,
      orderDesc: event.sortOrder === -1
    })
    console.log('Resultado da ordenação:', result)
    console.log('Contatos após ordenação:', contactsStore.contacts)
  } catch (error) {
    console.error('Erro ao ordenar contatos:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível ordenar a lista',
      life: 5000
    })
  }
}
</script>
