<template>
  <div class="max-w-2xl">
    <form @submit.prevent="changePassword">
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-surface-700 mb-2">
            Senha Atual *
          </label>
          <div class="relative">
            <InputText
              v-model="passwordData.currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Digite sua senha atual"
              class="w-full h-11 text-sm pr-12 border border-surface-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              :class="{
                'border-red-500 focus:border-red-500 focus:ring-red-100':
                  errors.currentPassword
              }"
            />
            <button
              type="button"
              @click="toggleCurrentPasswordVisibility"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
            >
              <i
                :class="showCurrentPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                class="text-sm"
              ></i>
            </button>
          </div>
          <small v-if="errors.currentPassword" class="text-red-600 text-xs">{{
            errors.currentPassword
          }}</small>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">
              Nova Senha *
            </label>
            <div class="relative">
              <InputText
                v-model="passwordData.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Digite sua nova senha"
                class="w-full h-11 text-sm pr-12 border border-surface-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100':
                    errors.newPassword
                }"
              />
              <button
                type="button"
                @click="toggleNewPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
              >
                <i
                  :class="showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  class="text-sm"
                ></i>
              </button>
            </div>
            <small v-if="errors.newPassword" class="text-red-600 text-xs">{{
              errors.newPassword
            }}</small>
          </div>

          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">
              Confirmar Nova Senha *
            </label>
            <div class="relative">
              <InputText
                v-model="passwordData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirme sua nova senha"
                class="w-full h-11 text-sm pr-12 border border-surface-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                :class="{
                  'border-red-500 focus:border-red-500 focus:ring-red-100':
                    errors.confirmPassword
                }"
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
              >
                <i
                  :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  class="text-sm"
                ></i>
              </button>
            </div>
            <small v-if="errors.confirmPassword" class="text-red-600 text-xs">{{
              errors.confirmPassword
            }}</small>
          </div>
        </div>

        <div class="flex justify-end pt-3">
          <Button
            type="submit"
            label="Alterar Senha"
            icon="pi pi-key"
            size="small"
            :loading="changingPassword"
            severity="secondary"
            class="px-6"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changingPassword = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const toast = useToast()

const toggleCurrentPasswordVisibility = () => {
  showCurrentPassword.value = !showCurrentPassword.value
}

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const validatePassword = (): boolean => {
  let isValid = true

  // Reset errors
  errors.currentPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (!passwordData.currentPassword) {
    errors.currentPassword = 'Senha atual é obrigatória'
    isValid = false
  }

  if (!passwordData.newPassword) {
    errors.newPassword = 'Nova senha é obrigatória'
    isValid = false
  } else if (passwordData.newPassword.length < 6) {
    errors.newPassword = 'Nova senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  if (!passwordData.confirmPassword) {
    errors.confirmPassword = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (passwordData.newPassword !== passwordData.confirmPassword) {
    errors.confirmPassword = 'Senhas não conferem'
    isValid = false
  }

  return isValid
}

const changePassword = async () => {
  if (!validatePassword()) return

  changingPassword.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''

    toast.add({
      severity: 'success',
      summary: 'Senha alterada',
      detail: 'Sua senha foi alterada com sucesso',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível alterar a senha',
      life: 5000
    })
  } finally {
    changingPassword.value = false
  }
}
</script>
