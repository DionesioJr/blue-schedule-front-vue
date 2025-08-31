<template>
  <footer class="bg-surface-50 border-t border-surface-200 mt-auto">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo and Description -->
        <div class="flex items-center space-x-3 mb-4 md:mb-0">
          <div class="w-8 h-8 flex items-center justify-center">
            <img
              src="/image/Blue.png"
              alt="Blue Technology"
              class="w-24 sm:w-32 h-auto mx-auto"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-surface-900">Blue Agenda</h3>
            <p class="text-sm text-surface-600">
              Gerenciamento inteligente de contatos
            </p>
          </div>
        </div>

        <!-- Company Info -->
        <div class="text-center md:text-right">
          <p class="text-sm text-surface-600 mb-1">
            Desenvolvido pela
            <a
              href="https://bluetechnology.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Blue Technology
            </a>
          </p>
          <p class="text-xs text-surface-500">
            © {{ new Date().getFullYear() }} Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
