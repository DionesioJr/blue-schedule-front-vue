<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Adicionar Novo Contato"
    class="min-w-screen min-h-screen md:min-w-auto md:min-h-auto"
  >
    <ContactForm
      :contact="null"
      :loading="loading"
      @submit="handleSubmit"
      @cancel="handleCancel"
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
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [contactData: Contact]
}>()

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const handleSubmit = (contactData: Contact) => {
  emit('submit', contactData)
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script>
