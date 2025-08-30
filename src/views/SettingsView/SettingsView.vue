<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-semibold text-surface-900">Configurações</h1>
      <p class="text-sm text-surface-600 mt-1">
        Gerencie suas configurações pessoais
      </p>
    </div>

    <!-- Settings Tabs -->
    <Card class="shadow-sm border border-surface-200">
      <template #content>
        <Tabs value="0">
          <TabList>
            <Tab value="0" class="flex items-center space-x-2">
              <span>Informações Pessoais</span>
            </Tab>
            <Tab value="1" class="flex items-center space-x-2">
              <span>Alterar Senha</span>
            </Tab>
            <Tab value="2" class="flex items-center space-x-2">
              <span>Apagar Conta</span>
            </Tab>
          </TabList>

          <TabPanels class="pt-6">
            <TabPanel value="0">
              <PersonalInfoTab />
            </TabPanel>
            <TabPanel value="1">
              <PasswordTab />
            </TabPanel>
            <TabPanel value="2">
              <DangerZoneTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>

    <!-- Confirmation Dialogs -->
    <ConfirmDialog />

    <!-- Toast for notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'

import PersonalInfoTab from './components/PersonalInfoTab.vue'
import PasswordTab from './components/PasswordTab.vue'
import DangerZoneTab from './components/DangerZoneTab.vue'
</script>
