<template>
  <header
    class="fixed w-full top-0 left-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-100 shadow-sm transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            src="/image/Blue.png"
            alt="Blue Technology"
            class="h-10 w-auto mr-3 transform hover:scale-105 transition-transform duration-300"
          />
          <span
            class="text-2xl font-semibold text-slate-900 tracking-wide font-display letter-spacing-wide"
            >Blue Agenda</span
          >
        </div>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            href="#inicio"
            class="nav-link text-slate-600 hover:text-primary-600 transition-all duration-300 font-normal tracking-wide"
          >
            <i class="pi pi-home mr-2 text-primary-500"></i>Início
          </a>
          <a
            href="#funcionalidades"
            class="nav-link text-slate-600 hover:text-primary-600 transition-all duration-300 font-normal tracking-wide"
          >
            <i class="pi pi-bolt mr-2 text-primary-500"></i>Funcionalidades
          </a>
          <a
            href="#tecnologia"
            class="nav-link text-slate-600 hover:text-primary-600 transition-all duration-300 font-normal tracking-wide"
          >
            <i class="pi pi-code mr-2 text-primary-500"></i>Tecnologia
          </a>
          <a
            href="#equipe"
            class="nav-link text-slate-600 hover:text-primary-600 transition-all duration-300 font-normal tracking-wide"
          >
            <i class="pi pi-users mr-2 text-primary-500"></i>Equipe
          </a>
        </nav>

        <!-- Ações -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            class="btn-secondary px-6 py-3 bg-transparent text-slate-600 border-2 border-slate-200 hover:border-slate-300 hover:bg-gray-50 transition-all duration-300 font-normal tracking-wide cursor-pointer"
            @click="login"
          >
            <i class="pi pi-sign-in mr-2"></i>Login
          </button>
          <button
            class="btn-primary px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg transform hover:translate-y-[-1px] transition-all duration-300 font-normal tracking-wide cursor-pointer"
            @click="register"
          >
            <i class="pi pi-user-plus mr-2"></i>Registrar
          </button>
        </div>

        <!-- Menu Mobile -->
        <div class="md:hidden flex items-center space-x-3">
          <button
            @click="toggleMobileMenu"
            class="text-slate-600 text-2xl focus:outline-none hover:text-primary-600 transition-colors duration-200 cursor-pointer"
          >
            <i :class="showMobileMenu ? 'pi pi-times' : 'pi pi-bars'"></i>
          </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div
          v-if="showMobileMenu"
          class="md:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-xl border-t border-gray-200 shadow-lg"
        >
          <nav class="px-6 py-4 space-y-4">
            <a
              href="#inicio"
              @click="closeMobileMenu"
              class="block text-slate-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <i class="pi pi-home mr-3 text-primary-500"></i>Início
            </a>
            <a
              href="#funcionalidades"
              @click="closeMobileMenu"
              class="block text-slate-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <i class="pi pi-bolt mr-3 text-primary-500"></i>Funcionalidades
            </a>
            <a
              href="#tecnologia"
              @click="closeMobileMenu"
              class="block text-slate-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <i class="pi pi-code mr-3 text-primary-500"></i>Tecnologia
            </a>
            <a
              href="#equipe"
              @click="closeMobileMenu"
              class="block text-slate-800 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              <i class="pi pi-users mr-3 text-primary-500"></i>Equipe
            </a>
            <div class="flex flex-col space-y-3 pt-4 border-t border-gray-200">
              <button
                class="w-full py-2.5 rounded-lg bg-gray-100 text-slate-800 border border-gray-300 hover:bg-gray-200 transition-all duration-200 font-medium cursor-pointer"
                @click="login"
              >
                <i class="pi pi-sign-in mr-2"></i>Login
              </button>
              <button
                class="w-full py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-200 font-medium cursor-pointer"
                @click="register"
              >
                <i class="pi pi-user-plus mr-2"></i>Registrar
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMobileMenu = ref(false)

const login = () => {
  router.push('/login')
  closeMobileMenu()
}

const register = () => {
  router.push('/register')
  closeMobileMenu()
}

// Função para alternar o tema (implementação futura)
// Será implementado quando o themeStore estiver disponível
// Removido para evitar warning de função não utilizada

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}
</script>

<script lang="ts">
// Exportação padrão para resolver o erro de componente
export default {
  name: 'HomeHeader'
}
</script>

<style scoped></style>
