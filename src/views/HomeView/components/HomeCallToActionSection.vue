<template>
  <div class="py-24 lg:py-32 bg-slate-900">
    <div class="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <h2
        class="text-4xl lg:text-5xl font-normal text-white mb-8 font-display leading-tight"
      >
        Pronto para Revolucionar sua
        <span class="block font-semibold">Gestão de Contatos?</span>
      </h2>
      <p
        class="text-xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
      >
        Junte-se a milhares de profissionais que já transformaram sua
        produtividade com o Blue Agenda
      </p>
      <div class="flex flex-col sm:flex-row gap-6 justify-center">
        <router-link
          to="/login"
          class="px-10 py-4 bg-white text-primary-600 font-medium tracking-wide hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] cursor-pointer"
        >
          Começar Agora
        </router-link>
        <a
          href="https://bluetechnology.com.br/contato/"
          target="_blank"
          class="px-10 py-4 border-2 border-slate-400 text-white font-medium tracking-wide hover:border-slate-300 hover:bg-slate-800 transition-all duration-300 cursor-pointer"
        >
          Falar com Vendas
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Componente sem lógica adicional
</script>

<script lang="ts">
// Exportação padrão para resolver o erro de componente
export default {
  name: 'HomeCallToActionSection'
}
</script>
