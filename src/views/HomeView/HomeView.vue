<template>
  <div class="min-h-screen bg-surface-50">
    <HomeHeader />
    <HomeHeroSection />
    <HomeFeaturesSection />
    <HomeTechnologySection />
    <HomeCallToActionSection />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
import HomeHeroSection from './components/HomeHeroSection.vue'
import HomeFeaturesSection from './components/HomeFeaturesSection.vue'
import HomeTechnologySection from './components/HomeTechnologySection.vue'
import HomeCallToActionSection from './components/HomeCallToActionSection.vue'
</script>
