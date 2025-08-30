<template>
  <div
    class="flex flex-col sm:flex-row gap-4 items-center mb-6 pb-6 border-b border-surface-200"
  >
    <div class="flex-1 w-full sm:w-auto">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchTerm"
          placeholder="Buscar por nome, email ou telefone..."
          class="w-full text-sm"
          size="small"
          @input="onSearch"
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
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'

const searchTerm = ref('')
const showFavoritesOnly = ref(false)
const showActiveOnly = ref(false)

const emit = defineEmits<{
  search: [term: string]
  filterFavorites: [show: boolean]
  filterActive: [show: boolean]
}>()

const onSearch = () => {
  emit('search', searchTerm.value)
}

const toggleFavoritesFilter = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value
  emit('filterFavorites', showFavoritesOnly.value)
}

const toggleActiveFilter = () => {
  showActiveOnly.value = !showActiveOnly.value
  emit('filterActive', showActiveOnly.value)
}
</script>
