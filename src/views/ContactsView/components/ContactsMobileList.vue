<template>
  <div class="block md:hidden">
    <div v-if="loading" class="text-center py-8">
      <ProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
      <p class="text-surface-600 mt-4">Carregando contatos...</p>
    </div>

    <div v-else-if="contacts.length === 0" class="text-center py-8">
      <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
      <p class="text-surface-600 text-lg">Nenhum contato encontrado</p>
      <p class="text-surface-500 text-sm">
        Comece adicionando seu primeiro contato
      </p>
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="contact in paginatedContacts"
        :key="contact.uuid"
        class="flex items-center justify-between p-4 bg-white border border-surface-200 rounded-lg cursor-pointer hover:bg-surface-50 transition-colors"
        @click="handleEditContact(contact)"
      >
        <div class="flex items-center space-x-3">
          <Avatar
            :image="contact.photo || undefined"
            :label="contact.photo ? '' : getInitials(contact.name)"
            class="w-10 h-10"
            shape="circle"
          />
          <div>
            <div class="font-normal text-surface-900">
              {{ contact.name }}
            </div>
            <div class="text-sm text-surface-600">{{ contact.email }}</div>
          </div>
        </div>

        <Button
          :icon="contact.favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
          :class="contact.favorite ? 'text-red-500' : 'text-surface-400'"
          text
          @click.stop="handleToggleFavorite(contact)"
        />
      </div>

      <!-- Mobile Pagination -->
      <div v-if="totalRecords > rowsPerPage" class="flex justify-center mt-4">
        <Paginator
          v-model:first="first"
          :rows="rowsPerPage"
          :total-records="totalRecords"
          template="PrevPageLink CurrentPageReport NextPageLink"
          current-page-report-template="{currentPage} de {totalPages}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'

import type { Contact } from '../../../types'

interface Props {
  contacts: Contact[]
  loading: boolean
  totalRecords?: number
}

const props = withDefaults(defineProps<Props>(), {
  totalRecords: 0
})

const emit = defineEmits<{
  edit: [contact: Contact]
  toggleFavorite: [contact: Contact]
}>()

// Paginação
const rowsPerPage = ref(10)
const first = ref(0)

// Contatos paginados
const paginatedContacts = computed(() => {
  const start = first.value
  const end = start + rowsPerPage.value
  return props.contacts.slice(start, end)
})

// Utilitários
const getInitials = (name?: string): string => {
  if (!name) return '??'

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

// Manipuladores de eventos
const handleEditContact = (contact: Contact) => {
  emit('edit', contact)
}

const handleToggleFavorite = (contact: Contact) => {
  emit('toggleFavorite', contact)
}
</script>
