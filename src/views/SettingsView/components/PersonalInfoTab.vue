<template>
  <div class="max-w-2xl">
    <!-- Profile Photo -->
    <div class="flex flex-col items-center mb-6">
      <div class="relative mb-4">
        <Avatar
          :image="userProfile.photo"
          :label="userProfile.photo ? '' : getInitials(userProfile.name)"
          class="w-24 h-24 text-xl"
          shape="circle"
          size="xlarge"
        />
      </div>

      <div class="flex gap-3">
        <Button
          label="Alterar Foto"
          icon="pi pi-upload"
          outlined
          size="small"
          class="text-xs"
          @click="openPhotoUpload"
        />
        <Button
          label="Remover"
          icon="pi pi-trash"
          outlined
          severity="secondary"
          size="small"
          class="text-xs"
          @click="removePhoto"
          :disabled="!userProfile.photo"
        />
      </div>
    </div>

    <!-- Personal Info Form -->
    <form @submit.prevent="updatePersonalInfo">
      <div class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">
              Nome Completo *
            </label>
            <InputText
              v-model="formData.name"
              placeholder="Digite seu nome completo"
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
              placeholder="seu@email.com"
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
            Telefone
          </label>
          <InputMask
            v-model="formData.phone"
            mask="(99) 99999-9999"
            placeholder="(11) 99999-9999"
            class="w-full h-11 text-sm"
          />
        </div>

        <div class="flex justify-end pt-3">
          <Button
            type="submit"
            label="Salvar Alterações"
            icon="pi pi-check"
            size="small"
            :loading="updating"
            class="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-6"
          />
        </div>
      </div>
    </form>

    <!-- File Upload Dialog -->
    <Dialog
      v-model:visible="showPhotoUpload"
      modal
      header="Alterar Foto do Perfil"
      class="w-96"
    >
      <div class="text-center p-4">
        <FileUpload
          mode="basic"
          name="photo"
          :maxFileSize="1000000"
          accept="image/*"
          :chooseLabel="'Selecionar Foto'"
          @select="onPhotoSelect"
          @error="onPhotoError"
        />
        <p class="text-xs text-surface-600 mt-2">
          Máximo 1MB. Formatos: JPG, PNG, GIF
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'

// Mock user data
const userProfile = ref({
  name: 'João Silva',
  email: 'joao@email.com',
  phone: '(11) 99999-9999',
  photo: null as string | null
})

const formData = reactive({
  name: userProfile.value.name,
  email: userProfile.value.email,
  phone: userProfile.value.phone
})

const errors = reactive({
  name: '',
  email: ''
})

const updating = ref(false)
const showPhotoUpload = ref(false)

const confirm = useConfirm()
const toast = useToast()

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const validatePersonalInfo = (): boolean => {
  let isValid = true

  // Reset errors
  errors.name = ''
  errors.email = ''

  if (!formData.name.trim()) {
    errors.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email é obrigatório'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email inválido'
    isValid = false
  }

  return isValid
}

const updatePersonalInfo = async () => {
  if (!validatePersonalInfo()) return

  updating.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    userProfile.value.name = formData.name
    userProfile.value.email = formData.email
    userProfile.value.phone = formData.phone

    toast.add({
      severity: 'success',
      summary: 'Informações atualizadas',
      detail: 'Suas informações pessoais foram atualizadas com sucesso',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível atualizar as informações',
      life: 5000
    })
  } finally {
    updating.value = false
  }
}

const openPhotoUpload = () => {
  showPhotoUpload.value = true
}

const onPhotoSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    // Create a URL for the uploaded file (in real app, upload to server)
    const reader = new FileReader()
    reader.onload = (e) => {
      userProfile.value.photo = e.target?.result as string
      showPhotoUpload.value = false
      toast.add({
        severity: 'success',
        summary: 'Foto atualizada',
        detail: 'Sua foto de perfil foi atualizada com sucesso',
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
  confirm.require({
    message: 'Tem certeza que deseja remover sua foto de perfil?',
    header: 'Confirmar Remoção',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-text p-button-text',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Remover',
    accept: () => {
      userProfile.value.photo = null
      toast.add({
        severity: 'info',
        summary: 'Foto removida',
        detail: 'Sua foto de perfil foi removida',
        life: 3000
      })
    }
  })
}
</script>
