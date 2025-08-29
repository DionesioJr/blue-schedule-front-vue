<template>
  <div id="funcionalidades" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-surface-900 mb-4">
          Funcionalidades Premium
        </h2>
        <p class="text-xl text-surface-600 max-w-2xl mx-auto">
          Todas as ferramentas que você precisa para gerenciar seus contatos de forma profissional
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon="pi-users"
          iconColor="from-blue-500 to-blue-600"
          title="Gestão Completa"
          description="CRUD completo de contatos com interface intuitiva. Crie, edite, visualize e organize todos os seus contatos em um só lugar."
        />

        <FeatureCard
          icon="pi-heart"
          iconColor="from-pink-500 to-pink-600"
          title="Favoritos"
          description="Marque contatos importantes como favoritos para acesso rápido. Sistema de sincronização automática em tempo real."
        />

        <FeatureCard
          icon="pi-image"
          iconColor="from-purple-500 to-purple-600"
          title="Upload de Fotos"
          description="Adicione fotos de perfil aos seus contatos. Identificação visual que torna o gerenciamento mais pessoal e eficiente."
        />

        <FeatureCard
          icon="pi-search"
          iconColor="from-orange-500 to-orange-600"
          title="Busca Inteligente"
          description="Encontre contatos rapidamente por nome, email ou telefone. Sistema de filtros avançados e paginação otimizada."
        />

        <FeatureCard
          icon="pi-shield"
          iconColor="from-red-500 to-red-600"
          title="Exclusão Segura"
          description="Soft delete com possibilidade de restauração. Seus dados estão protegidos contra exclusão acidental."
        />

        <FeatureCard
          icon="pi-cog"
          iconColor="from-teal-500 to-teal-600"
          title="Configurações"
          description="Personalize sua experiência com configurações avançadas de perfil e preferências do usuário."
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeFeatureCard from './HomeFeatureCard.vue'

export default defineComponent({
  name: 'HomeFeaturesSection',
  components: {
    HomeFeatureCard
  },
  setup() {
    // Features section component logic
    return {}
  }
})
</script>
