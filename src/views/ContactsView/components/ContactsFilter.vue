<template>
  <div
    class="flex flex-col sm:flex-row gap-4 items-center mb-6 pb-6 border-b border-surface-200"
  >
    <div class="flex-1 w-full sm:w-auto">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchTermModel"
          placeholder="Buscar por nome, email ou telefone..."
          class="w-full text-sm"
          size="small"
        />
      </IconField>
    </div>

    <div class="flex gap-3">
      <Button
        :label="showFavoritesOnly ? 'Todos' : 'Favoritos'"
        :icon="showFavoritesOnly ? 'pi pi-list' : 'pi pi-heart-fill'"
        :outlined="!showFavoritesOnly"
        size="small"
        class="whitespace-nowrap text-xs"
        @click="toggleFavoritesFilter"
      />

      <Button
        :label="showActiveOnly ? 'Todos' : 'Ativos'"
        :icon="showActiveOnly ? 'pi pi-list' : 'pi pi-check-circle'"
        :outlined="!showActiveOnly"
        size="small"
        class="whitespace-nowrap text-xs"
        @click="toggleActiveFilter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

interface Props {
  searchTerm: string
  showFavoritesOnly: boolean
  showActiveOnly: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:showFavoritesOnly': [value: boolean]
  'update:showActiveOnly': [value: boolean]
  search: []
}>()

// Modelo local para o termo de busca
const searchTermModel = computed({
  get: () => props.searchTerm,
  set: (value) => emit('update:searchTerm', value)
})

// Implementação do debounce para a busca
let searchTimeout = ref<number | null>(null)

// Observar mudanças no termo de busca e aplicar debounce
watch(
  () => searchTermModel.value,
  (newValue) => {
    // Limpar o timeout anterior se existir
    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value)
    }

    // Configurar um novo timeout de 500ms
    searchTimeout.value = setTimeout(() => {
      console.log('Executando busca após debounce de 500ms:', newValue)
      emit('search')
      searchTimeout.value = null
    }, 500) as unknown as number
  }
)

const toggleFavoritesFilter = () => {
  emit('update:showFavoritesOnly', !props.showFavoritesOnly)
}

const toggleActiveFilter = () => {
  emit('update:showActiveOnly', !props.showActiveOnly)
}
</script>
