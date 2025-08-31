<template>
  <section id="equipe" class="py-24 lg:py-32 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="mb-6">
          <span
            class="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full tracking-wide"
          >
            NOSSA EQUIPE
          </span>
        </div>
        <h2
          class="text-4xl lg:text-5xl font-normal text-slate-900 mb-6 font-display tracking-tight leading-tight"
        >
          Liderança
          <span class="block text-primary-600 font-semibold"> Experiente </span>
        </h2>
        <p
          class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Conheça os líderes visionários por trás da Blue Technology, combinando
          anos de experiência em tecnologia e inovação
        </p>
      </div>

      <!-- Team Photo -->
      <div class="mb-20">
        <div class="relative max-w-6xl mx-auto">
          <img
            src="/image/equipe.jpg"
            alt="Equipe Blue Technology - Great Place to Work Certificada"
            class="w-full h-auto rounded-lg shadow-xl"
          />
          <div
            class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <p class="text-sm font-medium text-slate-700">
              Great Place to Work® Certificada
            </p>
            <p class="text-xs text-slate-500">Jul/2025 - Jul/2026</p>
          </div>
        </div>
      </div>

      <!-- Leadership Cards -->
      <div class="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
        <!-- CEO Card -->
        <div class="group relative">
          <div
            class="bg-white p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <!-- Content -->
            <div class="relative">
              <!-- Image -->
              <div class="relative mb-8 mx-auto w-32 h-32">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipOi5XNgdAPLV2823Vv18lWwtr_gHQdN3oILE7Z1=s680-w680-h510-rw"
                  alt="CEO - Blue Technology"
                  class="w-full h-full object-cover rounded-full border-4 border-gray-100 shadow-md relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <!-- Info -->
              <div class="text-center">
                <h3
                  class="text-3xl font-light text-slate-900 mb-2 font-display"
                >
                  Leonardo Almeida
                </h3>
                <p
                  class="text-primary-600 font-medium mb-6 text-lg tracking-wide"
                >
                  CEO
                </p>
                <p
                  class="text-slate-600 leading-relaxed mb-8 font-light text-lg"
                >
                  Visionário empresarial com mais de 15 anos de experiência em
                  tecnologia e liderança estratégica. Especialista em
                  transformação digital e crescimento sustentável.
                </p>

                <!-- Skills -->
                <div class="flex flex-wrap justify-center gap-3">
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    ESTRATÉGIA
                  </span>
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    LIDERANÇA
                  </span>
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    INOVAÇÃO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTO Card -->
        <div class="group relative">
          <div
            class="bg-white p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <!-- Content -->
            <div class="relative">
              <!-- Image -->
              <div class="relative mb-8 mx-auto w-32 h-32">
                <img
                  src="https://lh3.googleusercontent.com/p/AF1QipOXpf2LIVgbx1R0N0GM7EaPmiK3btl1l-cEO_Tm=s680-w680-h510-rw"
                  alt="CTO - Blue Technology"
                  class="w-full h-full object-cover rounded-full border-4 border-gray-100 shadow-md relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <!-- Info -->
              <div class="text-center">
                <h3
                  class="text-3xl font-light text-slate-900 mb-2 font-display"
                >
                  Emerson Paz
                </h3>
                <p
                  class="text-primary-600 font-medium mb-6 text-lg tracking-wide"
                >
                  CTO & Sócio
                </p>
                <p
                  class="text-slate-600 leading-relaxed mb-8 font-light text-lg"
                >
                  Arquiteto de soluções tecnológicas com expertise em
                  desenvolvimento full-stack, cloud computing e arquiteturas
                  escaláveis. Responsável pela inovação tecnológica.
                </p>

                <!-- Skills -->
                <div class="flex flex-wrap justify-center gap-3">
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    ARQUITETURA
                  </span>
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    FULL-STACK
                  </span>
                  <span
                    class="px-4 py-2 bg-gray-100 text-slate-700 text-sm font-medium tracking-wide"
                  >
                    DEVOPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Company Values -->
      <div class="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div
          class="text-center p-6 bg-white backdrop-blur-sm rounded-xl border border-gray-100"
        >
          <div
            class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <i class="pi pi-lightbulb text-white text-xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 mb-2">Inovação</h4>
          <p class="text-slate-600 text-sm">
            Buscamos constantemente novas formas de revolucionar a gestão
            empresarial
          </p>
        </div>

        <div
          class="text-center p-6 bg-white backdrop-blur-sm rounded-xl border border-gray-100"
        >
          <div
            class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <i class="pi pi-heart text-white text-xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 mb-2">Excelência</h4>
          <p class="text-slate-600 text-sm">
            Comprometimento com a qualidade superior em cada produto e serviço
          </p>
        </div>

        <div
          class="text-center p-6 bg-white backdrop-blur-sm rounded-xl border border-gray-100"
        >
          <div
            class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4"
          >
            <i class="pi pi-users text-white text-xl"></i>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 mb-2">Colaboração</h4>
          <p class="text-slate-600 text-sm">
            Trabalhamos em parceria com nossos clientes para alcançar o sucesso
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script>

<script lang="ts">
// Exportação padrão para resolver o erro de componente
export default {
  name: 'HomeTeamSection'
}
</script>

<style scoped></style>
