<template>
  <div class="max-w-2xl">
    <!-- Profile Photo -->
    <div class="flex flex-col items-center mb-6">
      <div class="relative mb-4">
        <Avatar
          :image="userProfile.photo || undefined"
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
          :disabled="!userProfile.photo"
          @click="removePhoto"
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'

// @ts-ignore
import { usersService } from '@/services'
// @ts-ignore
import { useAuth } from '@/composables/useApi'

interface UserProfile {
  name: string
  email: string
  photo: string | null
}

interface UserFormData {
  name: string
  email: string
}

// User profile data
const userProfile = ref<UserProfile>({
  name: '',
  email: '',
  photo: null
})

const formData = reactive<UserFormData>({
  name: '',
  email: ''
})

const errors = reactive({
  name: '',
  email: ''
})

const updating = ref(false)
const showPhotoUpload = ref(false)

const confirm = useConfirm()
const toast = useToast()
const authStore = useAuth()

// Carregar dados reais do usuário ao montar o componente
onMounted(async () => {
  try {
    console.log('PersonalInfoTab: Carregando perfil do usuário...')

    // Carregar perfil do usuário usando o serviço diretamente
    const profile = await usersService.getProfile()

    console.log('PersonalInfoTab: Perfil carregado:', profile)

    // Atualizar dados do perfil
    userProfile.value.name = profile.name || ''
    userProfile.value.email = profile.email || ''
    userProfile.value.photo = profile.photo || null

    // Atualizar formData diretamente também
    formData.name = profile.name || ''
    formData.email = profile.email || ''

    console.log('PersonalInfoTab: userProfile atualizado:', userProfile.value)
    console.log('PersonalInfoTab: formData atualizado diretamente:', formData)
  } catch (error) {
    console.error('Erro ao carregar perfil do usuário:', error)
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar os dados do perfil',
      life: 5000
    })
  }
})

// Preenche o formulário com os dados do perfil
watch(
  userProfile,
  (newProfile) => {
    console.log('PersonalInfoTab: Watch triggered, newProfile:', newProfile)
    formData.name = newProfile.name
    formData.email = newProfile.email
    console.log('PersonalInfoTab: formData atualizado:', formData)
  },
  { immediate: true }
)

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
}

const validatePersonalInfo = (): boolean => {
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

  return isValid
}

const updatePersonalInfo = async () => {
  if (!validatePersonalInfo()) return

  updating.value = true

  try {
    // Atualizar dados do usuário usando o serviço diretamente
    const updatedProfile = await usersService.updateProfile({
      name: formData.name,
      photo: userProfile.value.photo || undefined
    })

    // Atualizar userProfile local com a resposta da API
    userProfile.value.name = updatedProfile.name || formData.name
    userProfile.value.email = updatedProfile.email || formData.email

    // Atualizar o auth store para que o header seja atualizado
    await authStore.loadUserProfile()
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
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
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        // Salvar a foto em base64 no perfil local
        userProfile.value.photo = e.target?.result as string

        // Enviar para o servidor
        await updatePersonalInfo()

        showPhotoUpload.value = false

        toast.add({
          severity: 'success',
          summary: 'Foto atualizada',
          detail: 'Sua foto de perfil foi atualizada com sucesso',
          life: 3000
        })
      } catch (error) {
        console.error('Erro ao salvar a foto:', error)
        toast.add({
          severity: 'error',
          summary: 'Erro no upload',
          detail: 'Não foi possível salvar a foto',
          life: 5000
        })
      }
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
    accept: async () => {
      try {
        // Atualizar perfil removendo a foto
        await usersService.updateProfile({
          name: formData.name,
          photo: undefined
        })

        userProfile.value.photo = null

        // Atualizar o auth store para que o header seja atualizado
        await authStore.loadUserProfile()

        toast.add({
          severity: 'info',
          summary: 'Foto removida',
          detail: 'Sua foto de perfil foi removida',
          life: 3000
        })
      } catch (error) {
        console.error('Erro ao remover foto:', error)
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível remover a foto',
          life: 5000
        })
      }
    }
  })
}
</script>
