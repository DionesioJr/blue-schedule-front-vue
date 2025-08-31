<template>
  <div id="funcionalidades" class="py-24 lg:py-32 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div class="text-center mb-20">
        <div class="mb-6">
          <span
            class="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full tracking-wide"
          >
            FUNCIONALIDADES
          </span>
        </div>
        <h2
          class="text-4xl lg:text-5xl font-normal text-slate-900 mb-6 font-display tracking-tight leading-tight"
        >
          Ferramentas
          <span class="block text-primary-600 font-semibold">Premium</span>
        </h2>
        <p
          class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Todas as funcionalidades que você precisa para gerenciar seus contatos
          de forma inteligente e profissional
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
      >
        <FeatureCard
          icon="pi-users"
          icon-color="from-blue-500 to-blue-600"
          title="Gestão Completa"
          description="CRUD completo de contatos com interface intuitiva. Crie, edite, visualize e organize todos os seus contatos em um só lugar."
        />

        <FeatureCard
          icon="pi-heart"
          icon-color="from-pink-500 to-pink-600"
          title="Favoritos"
          description="Marque contatos importantes como favoritos para acesso rápido. Sistema de sincronização automática em tempo real."
        />

        <FeatureCard
          icon="pi-image"
          icon-color="from-purple-500 to-purple-600"
          title="Upload de Fotos"
          description="Adicione fotos de perfil aos seus contatos. Identificação visual que torna o gerenciamento mais pessoal e eficiente."
        />

        <FeatureCard
          icon="pi-search"
          icon-color="from-orange-500 to-orange-600"
          title="Busca Inteligente"
          description="Encontre contatos rapidamente por nome, email ou telefone. Sistema de filtros avançados e paginação otimizada."
        />

        <FeatureCard
          icon="pi-shield"
          icon-color="from-red-500 to-red-600"
          title="Exclusão Segura"
          description="Soft delete com possibilidade de restauração. Seus dados estão protegidos contra exclusão acidental."
        />

        <FeatureCard
          icon="pi-cog"
          icon-color="from-teal-500 to-teal-600"
          title="Configurações"
          description="Personalize sua experiência com configurações avançadas de perfil e preferências do usuário."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FeatureCard from './HomeFeatureCard.vue'

export default defineComponent({
  name: 'HomeFeaturesSection',
  components: {
    FeatureCard
  },
  setup() {
    // Features section component logic
    return {}
  }
})
</script>
