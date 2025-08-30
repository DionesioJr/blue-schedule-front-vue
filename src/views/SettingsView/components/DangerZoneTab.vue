<template>
  <div class="max-w-2xl">
    <div class="bg-red-50 rounded-lg p-5 border border-red-200">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0">
          <i class="pi pi-exclamation-triangle text-red-600 text-lg mt-0.5"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-red-900 mb-2">Excluir Conta</h3>
          <p class="text-xs text-red-700 mb-4 leading-relaxed">
            Esta ação não pode ser desfeita. Todos os seus dados serão
            permanentemente removidos do sistema.
          </p>
          <Button
            label="Excluir Conta"
            icon="pi pi-trash"
            size="small"
            severity="danger"
            class="px-4"
            @click="showDeleteDialog = true"
          />
        </div>
      </div>
    </div>

    <!-- Delete Account Confirmation Dialog -->
    <Dialog
      v-model:visible="showDeleteDialog"
      modal
      header="Confirmar Exclusão da Conta"
      class="w-full max-w-md"
    >
      <div class="space-y-4">
        <div class="bg-red-50 rounded-lg p-4 border border-red-200">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <i
                class="pi pi-exclamation-triangle text-red-600 text-lg mt-0.5"
              ></i>
            </div>
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-red-900 mb-2">
                Excluir Conta
              </h3>
              <p class="text-xs text-red-700 leading-relaxed">
                Tem certeza que deseja excluir sua conta? Esta ação não pode ser
                desfeita e todos os seus dados serão permanentemente removidos
                do sistema.
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <Button
            label="Cancelar"
            size="small"
            text
            class="text-surface-600 hover:text-surface-800"
            @click="showDeleteDialog = false"
          />
          <Button
            label="Excluir Conta"
            icon="pi pi-trash"
            size="small"
            severity="danger"
            :loading="deletingAccount"
            @click="deleteAccount"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const toast = useToast()
const showDeleteDialog = ref(false)
const deletingAccount = ref(false)

const deleteAccount = async () => {
  deletingAccount.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.add({
      severity: 'success',
      summary: 'Conta excluída',
      detail: 'Sua conta foi excluída com sucesso. Você será redirecionado...',
      life: 3000
    })

    showDeleteDialog.value = false

    // In a real app, redirect to login or home page
    setTimeout(() => {
      // router.push('/login')
      console.log('Redirect to login page')
    }, 3000)
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível excluir a conta',
      life: 5000
    })
  } finally {
    deletingAccount.value = false
  }
}
</script>
