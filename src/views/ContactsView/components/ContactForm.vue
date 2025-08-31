<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <!-- Profile Photo -->
    <div class="flex flex-col items-center mb-6">
      <div class="relative mb-4">
        <Avatar
          :image="formData.photo || undefined"
          :label="formData.photo ? '' : getInitials(formData.name || 'N')"
          class="w-20 h-20 text-lg"
          size="xlarge"
          shape="circle"
        />
      </div>

      <div class="flex gap-2">
        <Button
          type="button"
          label="Alterar Foto"
          icon="pi pi-upload"
          outlined
          size="small"
          class="text-xs"
          @click="openPhotoUpload"
        />
        <Button
          type="button"
          label="Remover"
          icon="pi pi-trash"
          outlined
          severity="secondary"
          size="small"
          class="text-xs"
          :disabled="!formData.photo"
          @click="removePhoto"
        />
      </div>
    </div>

    <!-- Form Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-surface-700 mb-2">
          Nome Completo *
        </label>
        <InputText
          v-model="formData.name"
          placeholder="Digite o nome completo"
          class="w-full h-11 text-sm"
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="text-red-600 text-xs">{{
          errors.name
        }}</small>
      </div>

      <div>
        <label class="block text-sm font-medium text-surface-700 mb-2">
          Email *
        </label>
        <InputText
          v-model="formData.email"
          type="email"
          placeholder="email@exemplo.com"
          class="w-full h-11 text-sm"
          :class="{ 'p-invalid': errors.email }"
        />
        <small v-if="errors.email" class="text-red-600 text-xs">{{
          errors.email
        }}</small>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-surface-700 mb-2">
        Telefone *
      </label>
      <InputMask
        v-model="formData.phone"
        mask="(99) 99999-9999"
        placeholder="(11) 99999-9999"
        class="w-full h-11 text-sm"
        :class="{ 'p-invalid': errors.phone }"
      />
      <small v-if="errors.phone" class="text-red-600 text-xs">{{
        errors.phone
      }}</small>
    </div>

    <!-- Status Options -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex items-center space-x-3">
        <Checkbox
          v-model="formData.favorite"
          :binary="true"
          input-id="favorite"
        />
        <label
          for="favorite"
          class="text-sm font-medium text-surface-700 cursor-pointer"
        >
          Marcar como favorito
        </label>
      </div>

      <div class="flex items-center space-x-3">
        <Checkbox
          :modelValue="formData.isActive"
          :binary="true"
          input-id="active"
          @update:modelValue="handleIsActiveChange"
        />
        <label
          for="active"
          class="text-sm font-medium text-surface-700 cursor-pointer"
          @click="toggleIsActive"
        >
          Contato ativo ({{ formData.isActive ? 'Sim' : 'Não' }})
        </label>
      </div>
    </div>

    <!-- Form Actions -->
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 pt-4"
    >
      <!-- Mobile: vertical layout, Desktop: horizontal with justify-between -->

      <!-- Primary actions (Save/Cancel) - appear first on mobile -->
      <div class="flex flex-col sm:flex-row gap-3 md:order-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          outlined
          size="small"
          class="w-full sm:w-auto"
          @click="$emit('cancel')"
        />
        <Button
          type="submit"
          :label="isEditing ? 'Atualizar Contato' : 'Adicionar Contato'"
          :icon="isEditing ? 'pi pi-check' : 'pi pi-plus'"
          size="small"
          :loading="loading"
          class="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 w-full sm:w-auto"
        />
      </div>

      <!-- Delete button - appears last on mobile, first on desktop -->
      <div class="md:order-1">
        <Button
          v-if="showDeleteButton && isEditing"
          type="button"
          label="Excluir Contato"
          icon="pi pi-trash"
          severity="danger"
          outlined
          size="small"
          class="w-full md:w-auto"
          @click="handleDelete"
        />
      </div>
    </div>

    <!-- File Upload Dialog -->
    <Dialog
      v-model:visible="showPhotoUpload"
      modal
      header="Alterar Foto do Contato"
    >
      <div class="text-center p-4">
        <FileUpload
          mode="basic"
          name="photo"
          :max-file-size="1000000"
          accept="image/*"
          :choose-label="'Selecionar Foto'"
          @select="onPhotoSelect"
          @error="onPhotoError"
        />
        <p class="text-xs text-surface-600 mt-2">
          Máximo 1MB. Formatos: JPG, PNG, GIF
        </p>
      </div>
    </Dialog>
  </form>

  <!-- Delete Confirmation Dialog -->
  <DeleteContactDialog
    v-model:visible="showDeleteDialog"
    :contact="contact"
    :deleting="deleting"
    @confirm="handleDeleteConfirm"
  />
</template>

<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Checkbox from 'primevue/checkbox'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import DeleteContactDialog from './DeleteContactDialog.vue'
import type { Contact, ContactCreateDto, ContactForm } from '@/types'
import { contactToForm, formToCreateDto } from '@/types'

interface Props {
  contact?: Contact | null
  loading?: boolean
  showDeleteButton?: boolean
  deleting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  contact: null,
  loading: false,
  showDeleteButton: false,
  deleting: false
})

const emit = defineEmits<{
  submit: [contact: ContactCreateDto]
  cancel: []
  delete: [contact: Contact]
}>()

const formData = reactive<ContactForm>({
  name: '',
  email: '',
  phone: '',
  photo: null,
  favorite: false,
  isActive: true
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

const showPhotoUpload = ref(false)
const showDeleteDialog = ref(false)
const toast = useToast()

const isEditing = computed(() => !!props.contact?.uuid)

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.phone = ''
}

// Watch for prop changes to populate form
watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      Object.assign(formData, contactToForm(newContact))
      console.log('Formulário preenchido com contato existente:', {
        ...formData
      })
      console.log('isActive após preencher formulário:', formData.isActive)
    } else {
      // Reset form for new contact
      Object.assign(formData, {
        name: '',
        email: '',
        phone: '',
        photo: null,
        favorite: false,
        isActive: true
      })
      console.log('Formulário resetado para novo contato:', { ...formData })
    }
    clearErrors()
  },
  { immediate: true }
)

// Watch para monitorar mudanças no campo isActive
watch(
  () => formData.isActive,
  (newValue, oldValue) => {
    console.log('isActive mudou de', oldValue, 'para', newValue)
  }
)

const getInitials = (name: string): string => {
  if (!name) return 'N'
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const validateForm = (): boolean => {
  let isValid = true
  clearErrors()

  if (!formData.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = 'Telefone é obrigatório'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  console.log('Formulário antes de enviar:', { ...formData })
  console.log('isActive antes de enviar:', formData.isActive)

  const dto = formToCreateDto(formData)
  console.log('DTO a ser enviado:', dto)
  console.log('isActive no DTO:', dto.isActive)

  emit('submit', dto)
}

const openPhotoUpload = () => {
  showPhotoUpload.value = true
}

const onPhotoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      formData.photo = e.target?.result as string
      showPhotoUpload.value = false
      toast.add({
        severity: 'success',
        summary: 'Foto adicionada',
        detail: 'Foto do contato foi adicionada com sucesso',
        life: 3000
      })
    }
    reader.readAsDataURL(file)
  }
}

const onPhotoError = () => {
  toast.add({
    severity: 'error',
    summary: 'Erro no upload',
    detail: 'Não foi possível fazer upload da foto',
    life: 5000
  })
}

const removePhoto = () => {
  formData.photo = null
  toast.add({
    severity: 'info',
    summary: 'Foto removida',
    detail: 'Foto do contato foi removida',
    life: 3000
  })
}

const handleDelete = () => {
  showDeleteDialog.value = true
}

const handleDeleteConfirm = (contact: Contact) => {
  showDeleteDialog.value = false
  emit('delete', contact)
}

// Métodos para lidar com o campo isActive
const handleIsActiveChange = (value: boolean) => {
  console.log('handleIsActiveChange chamado com valor:', value)
  formData.isActive = value
  console.log('formData.isActive após atualização:', formData.isActive)
}

const toggleIsActive = () => {
  formData.isActive = !formData.isActive
  console.log('toggleIsActive: isActive agora é', formData.isActive)
}
</script>
