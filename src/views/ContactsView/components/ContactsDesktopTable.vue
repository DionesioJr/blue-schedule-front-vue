<template>
  <div class="hidden md:block mt-4">
    <!-- Mensagem de estado vazio quando não há contatos -->
    <div
      v-if="!loading && contacts.length === 0"
      class="text-center py-12 bg-white"
    >
      <i class="pi pi-users text-4xl text-surface-400 mb-4"></i>
      <p class="text-surface-600 text-lg mb-2">Nenhum contato encontrado</p>
      <p class="text-surface-500 text-sm">
        Comece adicionando seu primeiro contato
      </p>
    </div>

    <!-- Tabela exibida apenas quando há contatos ou está carregando -->
    <DataTable
      v-if="loading || contacts.length > 0"
      :value="contacts"
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
      <template #loading>
        <div class="text-center py-12">
          <ProgressSpinner style="width: 50px; height: 50px" stroke-width="4" />
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
            @click="handleEditContact(data)"
          />
        </template>
      </Column>

      <!-- Name Column -->
      <Column field="name" header="Nome" sortable>
        <template #body="{ data }">
          <div
            class="font-normal text-surface-900 cursor-pointer hover:text-blue-600 transition-colors"
            @click="handleEditContact(data)"
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
      <Column field="favorite" header="Favorito" class="w-24">
        <template #body="{ data }">
          <Button
            v-tooltip.top="
              data.favorite
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'
            "
            :icon="data.favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
            :class="data.favorite ? 'text-red-500' : 'text-surface-400'"
            text
            @click="handleToggleFavorite(data)"
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
            @click="handleActionMenu($event, data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'

import type { Contact } from '../../../types'

interface Props {
  contacts: Contact[]
  loading: boolean
  totalRecords?: number
}

withDefaults(defineProps<Props>(), {
  totalRecords: 0
})

const emit = defineEmits<{
  edit: [contact: Contact]
  delete: [contact: Contact]
  toggleFavorite: [contact: Contact]
  page: [event: any]
  sort: [event: any]
  actionMenu: [event: Event, contact: Contact]
}>()

// Utilitários
const getInitials = (name?: string): string => {
  if (!name) return '??'

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const formatPhone = (phone: string): string => {
  return phone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') || ''
}

// Manipuladores de eventos
const handleEditContact = (contact: Contact) => {
  emit('edit', contact)
}

const handleToggleFavorite = (contact: Contact) => {
  emit('toggleFavorite', contact)
}

const handleActionMenu = (event: Event, contact: Contact) => {
  emit('actionMenu', event, contact)
}

const onPage = (event: any) => {
  emit('page', event)
}

const onSort = (event: any) => {
  emit('sort', event)
}
</script>
