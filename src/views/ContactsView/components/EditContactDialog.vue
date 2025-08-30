<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :header="isEditing ? 'Editar Contato' : 'Novo Contato'"
    class="min-w-screen min-h-screen md:min-w-auto md:min-h-auto"
  >
    <ContactForm
      :contact="contact"
      :loading="loading"
      :deleting="deleting"
      :show-delete-button="true"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @delete="handleDelete"
    />
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import ContactForm from './ContactForm.vue'

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
  loading?: boolean
  deleting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  deleting: false
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [contactData: Contact]
  delete: [contact: Contact]
}>()

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const isEditing = computed(() => !!props.contact?.id)

const handleSubmit = (contactData: Contact) => {
  emit('submit', contactData)
}

const handleCancel = () => {
  emit('update:visible', false)
}

const handleDelete = (contact: Contact) => {
  emit('delete', contact)
}
</script>
