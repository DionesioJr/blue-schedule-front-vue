<template>
  <div id="tecnologia" class="py-24 bg-surface-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-surface-900 mb-4">
          Tecnologia de Ponta
        </h2>
        <p class="text-xl text-surface-600 max-w-2xl mx-auto">
          Desenvolvido com as melhores tecnologias do mercado para garantir
          performance e confiabilidade
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <TechCard
          icon="pi-code"
          icon-color="from-green-500 to-green-600"
          title="Vue 3"
          description="Framework Progressivo"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TechCard from './HomeTechCard.vue'
</script>
