<template>
  <div>
    <ContactsEmptyState 
      v-if="contacts.length === 0 || loading" 
      :loading="loading" 
    />

    <div v-else class="space-y-2">
      <div
        v-for="contact in paginatedContacts"
        :key="contact.id"
        class="flex items-center justify-between p-4 bg-white border border-surface-200 rounded-lg cursor-pointer hover:bg-surface-50 transition-colors"
        @click="$emit('edit', contact)"
      >
        <div class="flex items-center space-x-3">
          <Avatar
            :image="contact.photo"
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
          :icon="contact.isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
          :class="contact.isFavorite ? 'text-red-500' : 'text-surface-400'"
          text
          @click.stop="$emit('toggleFavorite', contact)"
        />
      </div>

      <div
        v-if="totalRecords > rowsPerPage"
        class="flex justify-center mt-4"
      >
        <Paginator
          :rows="rowsPerPage"
          :totalRecords="totalRecords"
          v-model:first="firstPage"
          template="PrevPageLink CurrentPageReport NextPageLink"
          currentPageReportTemplate="{currentPage} de {totalPages}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import ContactsEmptyState from './ContactsEmptyState.vue'

interface Contact {
  id: number
  name: string
  email: string
  photo?: string
  isFavorite: boolean
}

const props = defineProps<{
  contacts: Contact[]
  loading?: boolean
}>()

const emit = defineEmits([
  'edit', 
  'toggleFavorite'
])

const rowsPerPage = ref(10)
const firstPage = ref(0)

const totalRecords = computed(() => props.contacts.length)

const paginatedContacts = computed(() => {
  const start = firstPage.value
  const end = start + rowsPerPage.value
  return props.contacts.slice(start, end)
})

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>