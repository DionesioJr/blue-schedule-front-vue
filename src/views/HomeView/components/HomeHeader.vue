<template>
  <header
    class="fixed w-full top-0 left-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-md"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center">
          <img
            src="/image/Blue.png"
            alt="Blue Technology"
            class="h-10 w-auto mr-3 transform hover:scale-105 transition-transform duration-300"
          />
          <span class="text-xl font-semibold text-secundary tracking-tight"
            >Blue Agenda</span
          >
        </div>

        <!-- Navegação Desktop -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#inicio" class="nav-link">
            <i class="pi pi-home mr-2"></i>Início
          </a>
          <a href="#funcionalidades" class="nav-link">
            <i class="pi pi-bolt mr-2"></i>Funcionalidades
          </a>
          <a href="#tecnologia" class="nav-link">
            <i class="pi pi-code mr-2"></i>Tecnologia
          </a>
        </nav>

        <!-- Ações -->
        <div class="hidden md:flex items-center space-x-4">
          <button class="btn-secondary" @click="login">
            <i class="pi pi-sign-in mr-2"></i>Login
          </button>
          <button class="btn-primary" @click="register">
            <i class="pi pi-user-plus mr-2"></i>Registrar
          </button>
        </div>

        <!-- Menu Mobile -->
        <button class="md:hidden text-white text-2xl focus:outline-none">
          <i class="pi pi-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'HomeHeader',
  setup() {
    const router = useRouter()

    const login = () => router.push('/login')
    const register = () => router.push('/registro')

    return { login, register }
  }
})
</script>

<style scoped></style>
