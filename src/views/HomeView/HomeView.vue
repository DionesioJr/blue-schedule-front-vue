<template>
  <div class="min-h-screen bg-white">
    <HomeHeader />
    <HomeHeroSection />
    <HomeFeaturesSection />
    <HomeTechnologySection />
    <HomeTeamSection />
    <HomeCallToActionSection />
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
// Importação dos componentes da página inicial
import HomeHeader from './components/HomeHeader.vue'
import HomeFooter from './components/HomeFooter.vue'
import HomeHeroSection from './components/HomeHeroSection.vue'
import HomeFeaturesSection from './components/HomeFeaturesSection.vue'
import HomeTechnologySection from './components/HomeTechnologySection.vue'
import HomeTeamSection from './components/HomeTeamSection.vue'
import HomeCallToActionSection from './components/HomeCallToActionSection.vue'
</script>
