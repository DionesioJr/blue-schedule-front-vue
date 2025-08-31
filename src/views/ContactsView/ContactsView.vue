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

    <!-- Contacts Table - Agora gerencia suas próprias ações -->
    <ContactsTable />

    <!-- New Contact Dialog -->
    <NewContactDialog v-model:visible="showNewContactForm" />

    <!-- Toast for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import Toast from 'primevue/toast'

import ContactsTable from './components/ContactsTable.vue'
import NewContactDialog from './components/NewContactDialog.vue'

const showNewContactForm = ref(false)

const openNewContactDialog = () => {
  showNewContactForm.value = true
}
</script>
