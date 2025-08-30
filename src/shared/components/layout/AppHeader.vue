<template>
  <header
    class="bg-white border-b border-surface-200 sticky top-0 z-50 shadow-sm"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/contacts" class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center"
            >
              <i class="pi pi-users text-white text-sm"></i>
            </div>
            <span class="text-lg font-semibold text-surface-900"
              >Blue Agenda</span
            >
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="relative">
          <div
            class="p-0 border-0 bg-transparent hover:bg-surface-50 rounded-full cursor-pointer"
            aria-label="Menu do usuário"
            @click="toggleUserMenu"
          >
            <Avatar
              :image="currentUser.photo || undefined"
              :label="currentUser.photo ? '' : getUserInitials()"
              class="w-12 h-12 text-sm"
              size="normal"
              shape="circle"
            />
          </div>

          <!-- User Dropdown Menu -->
          <div
            v-show="showUserMenu"
            class="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border border-surface-200 py-2 z-50"
          >
            <!-- User Info -->
            <div class="px-4 py-3 border-b border-surface-200">
              <div class="flex items-center space-x-3">
                <Avatar
                  :image="currentUser.photo || undefined"
                  :label="currentUser.photo ? '' : getUserInitials()"
                  class="w-10 h-10 text-sm"
                  shape="circle"
                />
                <div>
                  <p class="text-sm font-medium text-surface-900">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-xs text-surface-500">
                    {{ currentUser.email }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="py-2">
              <router-link
                to="/settings"
                class="flex items-center space-x-3 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors duration-200"
                @click="closeUserMenu"
              >
                <i class="pi pi-cog text-surface-600"></i>
                <span>Configurações</span>
              </router-link>

              <button
                class="w-full flex items-center space-x-3 px-4 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors duration-200"
                @click="handleLogout"
              >
                <i class="pi pi-sign-out text-surface-600"></i>
                <span>Sair do Sistema</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Avatar from 'primevue/avatar'

const router = useRouter()
const toast = useToast()

const showUserMenu = ref(false)

// Mock user data
const currentUser = ref({
  name: 'João Silva',
  email: 'joao@email.com',
  photo: null as string | null
})

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const getUserInitials = (): string => {
  return currentUser.value.name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

const handleLogout = () => {
  closeUserMenu()
  toast.add({
    severity: 'success',
    summary: 'Logout realizado',
    detail: 'Você foi desconectado com sucesso',
    life: 3000
  })

  // In a real app, clear auth tokens and redirect to login
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}

// Close menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    closeUserMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
