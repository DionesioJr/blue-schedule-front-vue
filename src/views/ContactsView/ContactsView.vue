<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-semibold text-surface-900">Contatos</h1>
        <p class="text-sm text-surface-600 mt-1">
          Gerencie sua lista de contatos
        </p>
      </div>

      <Button
        label="Novo Contato"
        icon="pi pi-plus"
        size="small"
        class="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"
        @click="openNewContactDialog"
      />
    </div>

    <!-- Contacts Table -->
    <ContactsTable
      :contacts="contacts"
      :loading="loading"
      @edit-contact="openEditContactDialog"
      @delete-contact="openDeleteContactDialog"
    />

    <!-- New Contact Dialog -->
    <NewContactDialog
      v-model:visible="showNewContactForm"
      :loading="saving"
      @submit="handleNewContactSubmit"
    />

    <!-- Edit Contact Dialog -->
    <EditContactDialog
      v-model:visible="showContactDialog"
      :contact="selectedContact"
      :loading="saving"
      @submit="handleContactSubmit"
    />

    <!-- Delete Contact Dialog -->
    <DeleteContactDialog
      v-model:visible="showDeleteDialog"
      :contact="contactToDelete"
      :deleting="deleting"
      @confirm="handleDeleteContact"
    />

    <!-- Toast for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import Toast from 'primevue/toast'

import ContactsTable from './components/ContactsTable.vue'
import NewContactDialog from './components/NewContactDialog.vue'
import EditContactDialog from './components/EditContactDialog.vue'
import DeleteContactDialog from './components/DeleteContactDialog.vue'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  photo: string | null
  isFavorite: boolean
  isActive: boolean
}

// Mock data for demonstration
const contacts = ref<Contact[]>([
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    photo: null,
    isFavorite: true,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 88888-8888',
    photo: null,
    isFavorite: false,
    isActive: true
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    phone: '(11) 77777-7777',
    photo: null,
    isFavorite: true,
    isActive: false
  }
])

const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const showContactDialog = ref(false)
const showNewContactForm = ref(false)
const showDeleteDialog = ref(false)
const selectedContact = ref<Contact | null>(null)
const contactToDelete = ref<Contact | null>(null)

const toast = useToast()

const isEditing = computed(() => !!selectedContact.value?.id)

const openNewContactDialog = () => {
  showNewContactForm.value = true
}

const openEditContactDialog = (contact: Contact) => {
  selectedContact.value = { ...contact }
  showContactDialog.value = true
}

const openDeleteContactDialog = (contact: Contact) => {
  contactToDelete.value = contact
  showDeleteDialog.value = true
}

const handleNewContactSubmit = async (contactData: Contact) => {
  saving.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add new contact
    const newContact: Contact = {
      ...contactData,
      id: Math.max(...contacts.value.map((c) => c.id), 0) + 1
    }
    contacts.value.push(newContact)
    toast.add({
      severity: 'success',
      summary: 'Contato adicionado',
      detail: `${contactData.name} foi adicionado com sucesso`,
      life: 3000
    })

    showNewContactForm.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível salvar o contato',
      life: 5000
    })
  } finally {
    saving.value = false
  }
}

const handleContactSubmit = async (contactData: Contact) => {
  saving.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isEditing.value) {
      // Update existing contact
      const index = contacts.value.findIndex(
        (c) => c.id === selectedContact.value?.id
      )
      if (index > -1) {
        contacts.value[index] = {
          ...contactData,
          id: selectedContact.value!.id
        }
        toast.add({
          severity: 'success',
          summary: 'Contato atualizado',
          detail: `${contactData.name} foi atualizado com sucesso`,
          life: 3000
        })
      }
    } else {
      // Add new contact
      const newContact: Contact = {
        ...contactData,
        id: Math.max(...contacts.value.map((c) => c.id), 0) + 1
      }
      contacts.value.push(newContact)
      toast.add({
        severity: 'success',
        summary: 'Contato adicionado',
        detail: `${contactData.name} foi adicionado com sucesso`,
        life: 3000
      })
    }

    showContactDialog.value = false
    selectedContact.value = null
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível salvar o contato',
      life: 5000
    })
  } finally {
    saving.value = false
  }
}

const handleDeleteContact = async (contact: Contact) => {
  deleting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const index = contacts.value.findIndex((c) => c.id === contact.id)
    if (index > -1) {
      contacts.value.splice(index, 1)
      toast.add({
        severity: 'success',
        summary: 'Contato excluído',
        detail: `${contact.name} foi removido da lista`,
        life: 3000
      })
    }

    showDeleteDialog.value = false
    contactToDelete.value = null
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível excluir o contato',
      life: 5000
    })
  } finally {
    deleting.value = false
  }
}
</script>
