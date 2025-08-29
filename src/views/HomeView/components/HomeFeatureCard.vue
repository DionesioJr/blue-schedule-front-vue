<template>
  <div class="bg-white rounded-2xl p-8 border border-surface-200 hover:border-primary-200 transition-all duration-200 hover:shadow-lg group">
    <div :class="`w-14 h-14 bg-gradient-to-r ${iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`">
      <i :class="`pi ${icon} text-white text-xl`"></i>
    </div>
    <h3 class="text-xl font-bold text-surface-900 mb-3">{{ title }}</h3>
    <p class="text-surface-600 leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeFeatureCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
