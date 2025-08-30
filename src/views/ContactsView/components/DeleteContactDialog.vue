<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Confirmar Exclusão"
    class="min-w-screen min-h-screen md:min-w-auto md:min-h-auto"
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
              Excluir Contato
            </h3>
            <p class="text-xs text-red-700 leading-relaxed">
              Tem certeza que deseja excluir o contato
              <span class="font-medium">"{{ contact?.name }}"</span>? Esta ação
              não pode ser desfeita.
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
          @click="handleCancel"
        />
        <Button
          label="Excluir Contato"
          icon="pi pi-trash"
          size="small"
          severity="danger"
          :loading="deleting"
          @click="handleDelete"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

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
  visible: boolean
  contact: Contact | null
  deleting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  deleting: false
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [contact: Contact]
}>()

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const handleCancel = () => {
  emit('update:visible', false)
}

const handleDelete = () => {
  if (props.contact) {
    emit('confirm', props.contact)
  }
}
</script>
