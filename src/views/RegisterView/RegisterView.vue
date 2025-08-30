<template>
  <div
    class="min-h-screen bg-white sm:bg-gradient-to-br sm:from-primary-50 sm:via-blue-50 sm:to-surface-50 flex"
  >
    <!-- Formulário de Registro -->
    <div
      class="w-full flex items-center justify-center px-4 sm:px-8 py-6 sm:py-12"
    >
      <div
        class="w-full max-w-md sm:bg-white sm:shadow-2xl sm:rounded-3xl sm:p-12 sm:border sm:border-surface-100 p-4"
      >
        <!-- Logo e Marca -->
        <div class="text-center mb-8">
          <div class="mb-4 sm:mb-6">
            <img
              src="/image/Blue.png"
              alt="Blue Technology"
              class="w-24 sm:w-32 h-auto mx-auto"
            />
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">
            Blue Agenda
          </h1>
          <p class="text-surface-600">Crie sua conta</p>
        </div>

        <!-- Formulário de Registro -->
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label
              for="nome"
              class="block text-sm font-semibold text-surface-900 mb-2"
            >
              Nome Completo
            </label>
            <InputText
              id="nome"
              v-model="nome"
              type="text"
              placeholder="Seu nome completo"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white/50 sm:bg-white"
              required
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-semibold text-surface-900 mb-2"
            >
              Endereço de Email
            </label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white/50 sm:bg-white"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-semibold text-surface-900 mb-2"
            >
              Senha
            </label>
            <div class="relative">
              <InputText
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-3 sm:px-4 py-2 sm:py-3 pr-12 rounded-lg sm:rounded-xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white/50 sm:bg-white"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
                @click="togglePasswordVisibility"
              >
                <i
                  :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  class="text-lg"
                ></i>
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <Checkbox
              id="termsAccept"
              v-model="termsAccept"
              :binary="true"
              class="mr-2"
            />
            <label for="termsAccept" class="text-sm text-surface-700">
              Concordo com os
              <a href="#" class="text-primary-600 hover:text-primary-700"
                >termos de uso</a
              >
              e
              <a href="#" class="text-primary-600 hover:text-primary-700"
                >política de privacidade</a
              >
            </label>
          </div>

          <Button
            type="submit"
            label="Criar Conta"
            icon="pi pi-user-plus"
            class="w-full py-2 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          />
        </form>

        <!-- Link para Login -->
        <div class="mt-8 text-center">
          <p class="text-surface-600">
            Já tem uma conta?
            <router-link
              to="/login"
              class="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              Faça login
            </router-link>
          </p>
        </div>

        <!-- Voltar ao Início -->
        <div class="mt-6 text-center">
          <router-link
            to="/"
            class="inline-flex items-center text-surface-500 hover:text-primary-600 transition-colors"
          >
            <i class="pi pi-arrow-left mr-2"></i>
            Voltar ao Início
          </router-link>
        </div>

        <!-- Links de Privacidade -->
        <div
          class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-surface-200/50 sm:border-surface-200"
        >
          <div class="text-center space-y-3">
            <p class="text-xs text-surface-500">
              Ao se cadastrar, você concorda com nossos termos e políticas
            </p>
            <div class="flex flex-col sm:flex-col gap-4 text-xs">
              <a
                href="https://bluetechnology.com.br/politica-de-seguranca-da-informacao-psi/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Política de Segurança da Informação
              </a>
              <a
                href="https://bluetechnology.com.br/politica-de-direitos-do-titular-de-dados/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Política de Direitos do Titular de Dados
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const nome = ref('')
const email = ref('')
const password = ref('')
const termsAccept = ref(false)
const showPassword = ref(false)
const router = useRouter()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  try {
    if (!termsAccept.value) {
      alert('Você precisa aceitar os termos para continuar')
      return
    }

    // Aqui você implementaria a lógica de registro
    console.log('Registrando:', { nome: nome.value, email: email.value })
    // Exemplo de redirecionamento após registro
    router.push('/')
  } catch (error) {
    console.error('Erro no registro:', error)
  }
}
</script>
