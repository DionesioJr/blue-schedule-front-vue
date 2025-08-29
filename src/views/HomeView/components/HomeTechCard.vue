<template>
  <div class="text-center group">
    <div :class="`w-20 h-20 bg-gradient-to-r ${iconColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`">
      <i :class="`pi ${icon} text-white text-2xl`"></i>
    </div>
    <h4 class="font-bold text-surface-900 text-lg">{{ title }}</h4>
    <p class="text-surface-600 text-sm mt-1">{{ description }}</p>
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
