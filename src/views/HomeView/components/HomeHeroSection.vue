<template>
  <div id="inicio" class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-surface-50"
    ></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="text-center">
        <div class="mb-8">
          <img
            src="/image/Blue.png"
            alt="Blue Technology"
            class="w-24 h-auto mx-auto mb-6"
          />
        </div>
        <h1
          class="text-5xl md:text-6xl font-bold text-surface-900 mb-6 leading-tight"
        >
          Blue Agenda
        </h1>
        <p class="text-xl text-surface-600 mb-4 font-medium">
          Plataforma SaaS de Gestão de Contatos
        </p>
        <p
          class="text-lg text-surface-500 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Gerencie seus contatos de forma inteligente e eficiente. Uma solução
          premium desenvolvida pela Blue Technology para transformar a forma
          como você organiza seus relacionamentos.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#funcionalidades"
            class="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            <i class="pi pi-arrow-right mr-2"></i>
            Começar Agora
          </a>
          <a
            href="#tecnologia"
            class="bg-white hover:bg-surface-50 text-surface-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-surface-200 cursor-pointer"
          >
            Ver Tecnologia
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeHeroSection',
  setup() {
    // Hero section component logic
    return {}
  }
})
</script>
