<template>
  <div class="min-h-screen bg-white sm:bg-gradient-to-br sm:from-primary-50 sm:via-blue-50 sm:to-surface-50 flex">
    <!-- Left Side - Login Form -->
    <div class="w-full flex items-center justify-center px-4 sm:px-8 py-6 sm:py-12">
      <div class="w-full max-w-md sm:bg-white sm:shadow-2xl sm:rounded-3xl sm:p-12 sm:border sm:border-surface-100 p-4">
        <!-- Logo and Brand -->
        <div class="text-center mb-8">
          <div class="mb-4 sm:mb-6">
            <img src="/image/Blue.png" alt="Blue Technology" class="w-24 sm:w-32 h-auto mx-auto">
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">Blue Agenda</h1>
          <p class="text-surface-600">Faça login em sua conta</p>
        </div>

        <!-- Login Form -->
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-semibold text-surface-900 mb-2">
              Endereço de Email
            </label>
            <InputText 
              id="email" 
              type="email" 
              placeholder="seuemail@exemplo.com" 
              class="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white/50 sm:bg-white"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-surface-900 mb-2">
              Senha
            </label>
            <div class="relative">
              <InputText 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••" 
                class="w-full px-3 sm:px-4 py-2 sm:py-3 pr-12 rounded-lg sm:rounded-xl border border-surface-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white/50 sm:bg-white"
              />
              <button 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-surface-400 hover:text-surface-600 transition-colors"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'" class="text-lg"></i>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox id="rememberMe" v-model="rememberMe" :binary="true" class="mr-2" />
              <label for="rememberMe" class="text-sm text-surface-700">
                Lembrar de mim
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
              Esqueceu a senha?
            </a>
          </div>

          <Button 
            label="Entrar" 
            icon="pi pi-sign-in" 
            class="w-full py-2 sm:py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          />
        </form>

        <!-- Sign Up Link -->
        <div class="mt-8 text-center">
          <p class="text-surface-600">
            Não tem uma conta? 
            <router-link to="/register" class="text-primary-600 hover:text-primary-700 font-semibold transition-colors">
              Cadastre-se agora
            </router-link>
          </p>
        </div>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <router-link 
            to="/" 
            class="inline-flex items-center text-surface-500 hover:text-primary-600 transition-colors"
          >
            <i class="pi pi-arrow-left mr-2"></i>
            Voltar ao Início
          </router-link>
        </div>

        <!-- Privacy Links -->
        <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-surface-200/50 sm:border-surface-200">
          <div class="text-center space-y-3">
            <p class="text-xs text-surface-500">
              Ao fazer login, você concorda com nossos termos e políticas
            </p>
            <div class="flex flex-col sm:flex-col gap-4  text-xs">
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
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'

const rememberMe = ref(false)
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
