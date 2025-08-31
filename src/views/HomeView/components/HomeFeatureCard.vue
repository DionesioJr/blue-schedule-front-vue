<template>
  <div
    class="bg-white p-10 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
  >
    <div
      class="w-16 h-16 bg-primary-600 flex items-center justify-center mb-8 group-hover:bg-primary-700 transition-all duration-300"
    >
      <i :class="`pi ${icon} text-white text-2xl`"></i>
    </div>
    <h3
      class="text-2xl font-normal text-slate-900 mb-4 font-display leading-tight"
    >
      {{ title }}
    </h3>
    <p class="text-slate-600 leading-relaxed font-light text-lg">
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
