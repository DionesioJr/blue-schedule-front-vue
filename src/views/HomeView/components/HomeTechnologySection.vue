<template>
  <div id="tecnologia" class="py-24 lg:py-32 bg-white">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center mb-20">
        <div class="mb-6">
          <span
            class="inline-block px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full tracking-wide"
          >
            TECNOLOGIA
          </span>
        </div>
        <h2
          class="text-4xl lg:text-5xl font-normal text-slate-900 mb-6 font-display tracking-tight leading-tight"
        >
          Stack
          <span class="block text-primary-600 font-semibold">Moderno</span>
        </h2>
        <p
          class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Stack completo com .NET 9 no backend e Vue 3 no frontend, garantindo
          performance, segurança e escalabilidade enterprise
        </p>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto"
      >
        <TechCard
          icon="pi-code"
          icon-color="from-green-500 to-green-600"
          title="Vue 3"
          description="Framework Progressivo"
        />

        <TechCard
          icon="pi-server"
          icon-color="from-purple-500 to-purple-600"
          title="ASP.NET 9"
          description="Backend Robusto"
        />

        <TechCard
          icon="pi-verified"
          icon-color="from-blue-500 to-blue-600"
          title="TypeScript"
          description="Tipagem Segura"
        />

        <TechCard
          icon="pi-palette"
          icon-color="from-purple-500 to-purple-600"
          title="PrimeVue"
          description="Componentes UI"
        />

        <TechCard
          icon="pi-mobile"
          icon-color="from-teal-500 to-teal-600"
          title="Tailwind CSS"
          description="Design System"
        />

        <TechCard
          icon="pi-database"
          icon-color="from-orange-500 to-orange-600"
          title="MySQL"
          description="Banco de Dados"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Importação do componente HomeTechCard
import TechCard from './HomeTechCard.vue'
</script>
