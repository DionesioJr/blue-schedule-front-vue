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
import { computed, ref } from 'vue'
import Dialog from 'primevue/dialog'
import ContactForm from './ContactForm.vue'
import type { Contact, ContactCreateDto } from '../../../types'
import { useContacts } from '../../../composables/useApi'
import { useToast } from 'primevue/usetoast'

interface Props {
  visible: boolean
  contact: Contact | null
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const isVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

// Obter serviços de contatos e toast
const { updateContact, deleteContact } = useContacts()
const toast = useToast()

// Estados locais
const loading = ref(false)
const deleting = ref(false)

const isEditing = computed(() => !!props.contact?.uuid)

const handleSubmit = async (contactData: ContactCreateDto) => {
  if (!props.contact) return

  loading.value = true

  try {
    const updatedContact = await updateContact(props.contact.uuid, contactData)
    console.log('Contato atualizado:', updatedContact)

    toast.add({
      severity: 'success',
      summary: 'Contato atualizado',
      detail: `${contactData.name} foi atualizado com sucesso`,
      life: 3000
    })

    // Fechar o diálogo após sucesso
    emit('update:visible', false)
  } catch (error) {
    console.error('Erro ao atualizar contato:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível atualizar o contato',
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  emit('update:visible', false)
}

const handleDelete = async (contact: Contact) => {
  if (!contact) return

  deleting.value = true

  try {
    await deleteContact(contact.uuid)
    console.log('Contato excluído:', contact.uuid)

    toast.add({
      severity: 'success',
      summary: 'Contato excluído',
      detail: `${contact.name} foi removido da lista`,
      life: 3000
    })

    // Fechar o diálogo após sucesso
    emit('update:visible', false)
  } catch (error) {
    console.error('Erro ao excluir contato:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível excluir o contato',
      life: 5000
    })
  } finally {
    deleting.value = false
  }
}
</script>
