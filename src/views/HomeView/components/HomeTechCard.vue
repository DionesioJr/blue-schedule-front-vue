<template>
  <div class="text-center group p-6">
    <div
      class="w-16 h-16 bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-all duration-300 border border-gray-100"
    >
      <i :class="`pi ${icon} text-slate-600 text-2xl`"></i>
    </div>
    <h4 class="font-normal text-slate-900 text-xl font-display mb-2">
      {{ title }}
    </h4>
    <p class="text-slate-500 text-sm font-light">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  iconColor: string
  title: string
  description: string
}

defineProps<Props>()
</script>

<script lang="ts">
// Exportação padrão para resolver o erro de componente
export default {
  name: 'HomeTechCard'
}
</script>
