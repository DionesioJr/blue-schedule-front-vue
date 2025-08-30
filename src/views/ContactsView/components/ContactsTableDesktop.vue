<template>
  <DataTable
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
        style: 'padding-top: 1rem; border-top: 1px solid var(--surface-border)'
      },
      headerCell: {
        style:
          'font-weight: 500; color: var(--text-color); background: var(--surface-50)'
      }
    }"
    striped-rows
    @page="$emit('page', $event)"
    @sort="$emit('sort', $event)"
  >
    <template #empty>
      <ContactsEmptyState :loading="false" />
    </template>

    <template #loading>
      <ContactsEmptyState :loading="true" />
    </template>

    <!-- Photo Column -->
    <Column field="photo" header="Foto" class="w-20">
      <template #body="{ data }">
        <Avatar
          :image="data.photo || undefined"
          :label="data.photo ? '' : getInitials(data.name)"
          class="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
          shape="circle"
          @click="$emit('edit', data)"
        />
      </template>
    </Column>

    <!-- Name Column -->
    <Column field="name" header="Nome" sortable>
      <template #body="{ data }">
        <div
          class="font-normal text-surface-900 cursor-pointer hover:text-blue-600 transition-colors"
          @click="$emit('edit', data)"
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

    <!-- Other columns remain the same... -->
  </DataTable>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Avatar from 'primevue/avatar'
import ContactsEmptyState from './ContactsEmptyState.vue'

interface Contact {
  id: number
  name: string
  email: string
  photo?: string
}

const props = defineProps<{
  contacts: Contact[]
  loading?: boolean
}>()

const emit = defineEmits(['edit', 'page', 'sort'])

const totalRecords = computed(() => props.contacts.length)

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>
