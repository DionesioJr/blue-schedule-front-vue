<template>
  <Card class="shadow-sm border border-surface-200">
    <template #content>
      <!-- Search and Filters -->
      <div
        class="flex flex-col sm:flex-row gap-4 items-center mb-6 pb-6 border-b border-surface-200"
      >
        <div class="flex-1 w-full sm:w-auto">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="searchTerm"
              placeholder="Buscar por nome, email ou telefone..."
              class="w-full text-sm"
              size="small"
              @input="onSearch"
            />
          </IconField>
        </div>

        <div class="flex gap-3">
          <Button
            :label="showFavoritesOnly ? 'Todos' : 'Favoritos'"
            :icon="showFavoritesOnly ? 'pi pi-list' : 'pi pi-heart-fill'"
            :outlined="!showFavoritesOnly"
            size="small"
            class="whitespace-nowrap text-xs"
            @click="toggleFavoritesFilter"
          />

          <Button
            :label="showActiveOnly ? 'Todos' : 'Ativos'"
            :icon="showActiveOnly ? 'pi pi-list' : 'pi pi-check-circle'"
            :outlined="!showActiveOnly"
            size="small"
            class="whitespace-nowrap text-xs"
            @click="toggleActiveFilter"
          />
        </div>
      </div>

      <!-- Mobile View - Minimal List -->
      <div class="block md:hidden">
        <div v-if="loading" class="text-center py-8">
          <ProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
          <p class="text-surface-600 mt-4">Carregando contatos...</p>
        </div>

        <div v-else-if="filteredContacts.length === 0" class="text-center py-8">
          <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
          <p class="text-surface-600 text-lg">Nenhum contato encontrado</p>
          <p class="text-surface-500 text-sm">
            Comece adicionando seu primeiro contato
          </p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="contact in paginatedContactsMobile"
            :key="contact.id"
            class="flex items-center justify-between p-4 bg-white border border-surface-200 rounded-lg cursor-pointer hover:bg-surface-50 transition-colors"
            @click="editContact(contact)"
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
              :icon="contact.isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
              :class="contact.isFavorite ? 'text-red-500' : 'text-surface-400'"
              text
              @click.stop="toggleFavorite(contact)"
            />
          </div>

          <!-- Mobile Pagination -->
          <div
            v-if="totalRecords > rowsMobile"
            class="flex justify-center mt-4"
          >
            <Paginator
              v-model:first="firstMobile"
              :rows="rowsMobile"
              :total-records="totalRecords"
              template="PrevPageLink CurrentPageReport NextPageLink"
              current-page-report-template="{currentPage} de {totalPages}"
            />
          </div>
        </div>
      </div>

      <!-- Desktop View - Full DataTable -->
      <div class="hidden md:block mt-4">
        <DataTable
          :value="filteredContacts"
          :loading="loading"
          :paginator="true"
          :rows="10"
          :total-records="totalRecords"
          :rows-per-page-options="[5, 10, 25, 50]"
          paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          current-page-report-template="{first} - {last} de {totalRecords} contatos"
          class="p-datatable-striped"
          :pt="{
            table: { style: 'margin-bottom: 1.5rem' },
            paginator: {
              style:
                'padding-top: 1rem; border-top: 1px solid var(--surface-border)'
            },
            headerCell: {
              style:
                'font-weight: 500; color: var(--text-color); background: var(--surface-50)'
            }
          }"
          striped-rows
          @page="onPage"
          @sort="onSort"
        >
          <template #empty>
            <div class="text-center py-12">
              <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
              <p class="text-surface-600 text-lg mb-2">
                Nenhum contato encontrado
              </p>
              <p class="text-surface-500 text-sm">
                Comece adicionando seu primeiro contato
              </p>
            </div>
          </template>

          <template #loading>
            <div class="text-center py-12">
              <ProgressSpinner
                style="width: 50px; height: 50px"
                stroke-width="4"
              />
              <p class="text-surface-600 mt-4">Carregando contatos...</p>
            </div>
          </template>

          <!-- Photo Column -->
          <Column field="photo" header="Foto" class="w-20">
            <template #body="{ data }">
              <Avatar
                :image="data.photo || undefined"
                :label="data.photo ? '' : getInitials(data.name)"
                class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
                shape="circle"
                @click="editContact(data)"
              />
            </template>
          </Column>

          <!-- Name Column -->
          <Column field="name" header="Nome" sortable>
            <template #body="{ data }">
              <div
                class="font-normal text-surface-900 cursor-pointer hover:text-blue-600 transition-colors"
                @click="editContact(data)"
              >
                {{ data.name }}
              </div>
            </template>
          </Column>

          <!-- Email Column -->
          <Column field="email" header="Email" sortable>
            <template #body="{ data }">
              <a
                :href="`mailto:${data.email}`"
                class="text-surface-600 hover:text-blue-600 hover:underline transition-colors text-sm"
              >
                {{ data.email }}
              </a>
            </template>
          </Column>

          <!-- Phone Column -->
          <Column field="phone" header="Telefone" sortable>
            <template #body="{ data }">
              <a
                :href="`tel:${data.phone}`"
                class="text-surface-600 hover:text-blue-600 transition-colors text-sm"
              >
                {{ formatPhone(data.phone) }}
              </a>
            </template>
          </Column>

          <!-- Favorite Column -->
          <Column field="isFavorite" header="Favorito" class="w-24">
            <template #body="{ data }">
              <Button
                v-tooltip.top="
                  data.isFavorite
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'
                "
                :icon="data.isFavorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
                :class="data.isFavorite ? 'text-red-500' : 'text-surface-400'"
                text
                @click="toggleFavorite(data)"
              />
            </template>
          </Column>

          <!-- Status Column -->
          <Column field="isActive" header="Status" class="w-24">
            <template #body="{ data }">
              <Tag
                :value="data.isActive ? 'Ativo' : 'Inativo'"
                :severity="data.isActive ? 'success' : 'secondary'"
                rounded
              />
            </template>
          </Column>

          <!-- Actions Column -->
          <Column header="Ações" class="w-32">
            <template #body="{ data }">
              <Button
                v-tooltip.top="'Ações'"
                icon="pi pi-ellipsis-h"
                size="small"
                severity="secondary"
                outlined
                text
                @click="toggleActionMenu($event, data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>

  <!-- Context Menu for Actions -->
  <Menu ref="actionMenu" :model="currentActionItems" :popup="true" />
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
import { useToast } from 'primevue/usetoast'

import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  photo: string | null
  isFavorite: boolean
  isActive: boolean
}

interface Props {
  contacts: Contact[]
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  editContact: [contact: Contact]
  deleteContact: [contact: Contact]
}>()

const searchTerm = ref('')
const showFavoritesOnly = ref(false)
const showActiveOnly = ref(false)
const totalRecords = ref(0)
const actionMenu = ref()
const currentActionItems = ref<
  { label: string; icon: string; command: () => void }[]
>([])

// Mobile pagination
const rowsMobile = ref(10)
const firstMobile = ref(0)

const toast = useToast()

const filteredContacts = computed(() => {
  let filtered = props.contacts

  // Search filter
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.phone.includes(search)
    )
  }

  // Favorites filter
  if (showFavoritesOnly.value) {
    filtered = filtered.filter((contact) => contact.isFavorite)
  }

  // Active filter
  if (showActiveOnly.value) {
    filtered = filtered.filter((contact) => contact.isActive)
  }

  totalRecords.value = filtered.length
  return filtered
})

const paginatedContactsMobile = computed(() => {
  const start = firstMobile.value
  const end = start + rowsMobile.value
  return filteredContacts.value.slice(start, end)
})

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

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

const onSearch = () => {
  // Search functionality is handled by computed property
}

const toggleFavoritesFilter = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value
}

const toggleActiveFilter = () => {
  showActiveOnly.value = !showActiveOnly.value
}

const toggleFavorite = (contact: Contact) => {
  contact.isFavorite = !contact.isFavorite
  toast.add({
    severity: contact.isFavorite ? 'success' : 'info',
    summary: contact.isFavorite
      ? 'Adicionado aos favoritos'
      : 'Removido dos favoritos',
    detail: contact.name,
    life: 3000
  })
}

const editContact = (contact: Contact) => {
  emit('editContact', contact)
}

const deleteContact = (contact: Contact) => {
  emit('deleteContact', contact)
}

const onPage = () => {
  // Pagination logic
}

const onSort = () => {
  // Sorting logic
}
</script>
