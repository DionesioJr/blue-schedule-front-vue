<template>
  <div id="inicio" class="relative overflow-hidden bg-white">
    <div class="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 pt-40">
      <div class="text-center">
        <div class="mb-12">
          <img
            src="/image/Blue.png"
            alt="Blue Technology"
            class="w-20 h-auto mx-auto mb-8 opacity-90"
          />
        </div>
        <h1
          class="text-5xl md:text-7xl lg:text-8xl font-normal text-slate-900 mb-8 leading-[0.9] font-display tracking-tight"
        >
          Blue
          <span class="block text-primary-600 font-semibold">Agenda</span>
        </h1>
        <p
          class="text-2xl text-slate-600 mb-6 font-normal tracking-wide max-w-3xl mx-auto"
        >
          Plataforma SaaS de Gestão de Contatos
        </p>
        <p
          class="text-lg text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Gerencie seus contatos de forma inteligente e eficiente. Uma solução
          premium desenvolvida pela Blue Technology para transformar a forma
          como você organiza seus relacionamentos.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a
            href="#funcionalidades"
            class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 px-10 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] cursor-pointer tracking-wide"
          >
            Começar Agora
            <i class="pi pi-arrow-right ml-3"></i>
          </a>
          <a
            href="#tecnologia"
            class="bg-transparent hover:bg-gray-50 text-slate-600 font-medium py-4 px-10 rounded-sm transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 cursor-pointer tracking-wide"
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
