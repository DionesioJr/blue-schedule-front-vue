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
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import ContactForm from './ContactForm.vue'
import type { ContactCreateDto } from '../../../types'
import { useContacts } from '../../../composables/useApi'
import { useToast } from 'primevue/usetoast'

// Usar props para controlar a visibilidade
interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

// Obter serviço de contatos e toast
const { createContact } = useContacts()
const toast = useToast()

// Estado de carregamento local
const loading = ref(false)

const handleSubmit = async (contactData: ContactCreateDto) => {
  loading.value = true

  try {
    const newContact = await createContact(contactData)
    console.log('Novo contato criado:', newContact)

    toast.add({
      severity: 'success',
      summary: 'Contato adicionado',
      detail: `${contactData.name} foi adicionado com sucesso`,
      life: 3000
    })

    // Fechar o diálogo após sucesso
    emit('update:visible', false)
  } catch (error) {
    console.error('Erro ao criar contato:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível salvar o contato',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script>
