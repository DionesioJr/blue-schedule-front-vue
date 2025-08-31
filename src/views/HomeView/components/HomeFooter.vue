<template>
  <div class="bg-slate-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Blue Technology Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center mb-6">
            <img
              src="/image/blue-white.png"
              alt="Blue Technology"
              class="h-8 w-auto mr-3"
            />
            <span class="text-xl font-normal">Blue Technology</span>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed mb-6">
            Empresa líder em tecnologia focada em soluções digitais inovadoras e
            transformação digital.
          </p>

          <!-- Social Media -->
          <div class="flex space-x-4">
            <a
              href="https://instagram.com/bluetechnology"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <i class="pi pi-instagram text-lg"></i>
            </a>
            <a
              href="https://youtube.com/@bluetechnology"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <i class="pi pi-youtube text-lg"></i>
            </a>
            <a
              href="https://linkedin.com/company/bluetechnology"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <i class="pi pi-linkedin text-lg"></i>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5581999999999"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <i class="pi pi-whatsapp text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-lg font-semibold mb-6">Navegação</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#inicio"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
                >Início</a
              >
            </li>
            <li>
              <a
                href="#funcionalidades"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
                >Funcionalidades</a
              >
            </li>
            <li>
              <a
                href="#tecnologia"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
                >Tecnologia</a
              >
            </li>
            <li>
              <router-link
                to="/login"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
                >Login</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div>
          <h3 class="text-lg font-semibold mb-6">Contato</h3>
          <div class="space-y-4">
            <div class="text-slate-300 text-sm">
              <p class="font-medium mb-1">Recife - PE</p>
              <p class="leading-relaxed">
                Rua do Brum, 248, Sl 11 – 3º Andar<br />Recife Antigo
              </p>
            </div>
            <div class="text-slate-300 text-sm">
              <p class="font-medium mb-1">Recife - PE</p>
              <p class="leading-relaxed">
                Rua Arnóbio Marques, 253, 24º andar<br />Santo Amaro
              </p>
            </div>
          </div>
        </div>

        <!-- Policies and Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-6">Políticas</h3>
          <ul class="space-y-3">
            <li>
              <a
                href="https://bluetechnology.com.br/politica-de-seguranca-da-informacao-psi/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
              >
                Política de Segurança da Informação
              </a>
            </li>
            <li>
              <a
                href="https://bluetechnology.com.br/politica-de-direitos-do-titular-de-dados/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
              >
                Política de Direitos do Titular de Dados
              </a>
            </li>
            <li>
              <a
                href="https://bluetechnology.com.br/politica-de-protecao-de-dados-externos/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-300 hover:text-primary-400 transition-colors text-sm"
              >
                Política de Proteção de Dados Externos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-slate-800 pt-8">
        <div class="flex flex-col lg:flex-row justify-between items-center">
          <!-- Copyright -->
          <div class="text-center lg:text-left mb-6 lg:mb-0">
            <p class="text-slate-400 text-sm">
              © 2024 Blue Technology. Todos os direitos reservados.
            </p>
            <p class="text-slate-500 text-xs mt-1">
              Blue Agenda - Plataforma SaaS de Gestão de Contatos
            </p>
          </div>

          <!-- Certifications/Partners -->
          <div class="flex items-center space-x-6">
            <div class="text-slate-400 text-xs text-center">
              <div
                class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-2"
              >
                <i class="pi pi-shield text-primary-400"></i>
              </div>
              <span>LGPD</span>
            </div>
            <div class="text-slate-400 text-xs text-center">
              <div
                class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-2"
              >
                <i class="pi pi-verified text-primary-400"></i>
              </div>
              <span>ISO</span>
            </div>
            <div class="text-slate-400 text-xs text-center">
              <div
                class="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-2"
              >
                <i class="pi pi-star text-primary-400"></i>
              </div>
              <span>Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeFooter',
  setup() {
    // Footer component logic
    return {}
  }
})
</script>
