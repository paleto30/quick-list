<template>
  <AppContainer>
    <!-- Alerta de éxito global -->
    <MyAlert
      v-if="showSuccessAlert"
      title="Creado exitosamente"
      type="success"
      :duration="3000"
      @close="showSuccessAlert = false"
    />

    <!-- Encabezado de grupos con botón “add group +” -->
    <section class="mb-4">
      <div class="flex justify-end mb-2">
        <button
          @click="isAddGroupModalOpen = true"
          class="text-sm sm:text-base border border-blue-400 px-3 py-1 rounded-md text-blue-400 hover:bg-blue-900 transition whitespace-nowrap"
        >
          add group +
        </button>
      </div>

      <!-- Toggle Groups -->
      <div
        class="cursor-pointer hover:bg-gray-800 px-2 py-2 rounded-md transition w-full mb-4"
        @click="showGroups = !showGroups"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>👥</span>
            <h2 class="text-xl font-semibold">Grupos activos</h2>
          </div>
          <span class="text-xl text-gray-400">
            {{ showGroups ? "▾" : "▸" }}
          </span>
        </div>
        <div class="w-full border-t border-gray-600 mt-2"></div>
      </div>

      <transition name="fade">
        <div
          v-show="showGroups"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <GroupCard
            v-for="(group, index) in currentGroups"
            :key="index"
            :title="group.institutionName"
            :subject="group.subject"
            :code="group.referenceCode"
            border="emerald"
          />
        </div>
      </transition>
    </section>

    <!-- Archived -->
    <section class="mt-8">
      <div
        class="relative mb-2 cursor-pointer hover:bg-gray-800 px-2 py-2 rounded-md transition mb-4"
        @click="showArchived = !showArchived"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>📂</span>
            <h2 class="text-xl font-semibold">Grupos archivados</h2>
          </div>
          <span class="text-xl text-gray-400">
            {{ showArchived ? "▾" : "▸" }}
          </span>
        </div>
        <div class="w-full border-t border-gray-600 mt-2"></div>
      </div>

      <transition name="fade">
        <div
          v-show="showArchived"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <GroupCard
            v-for="(group, index) in archivedGroups"
            :key="index"
            :title="group.institutionName"
            :subject="group.subject"
            :code="group.referenceCode"
            border="blue"
          />
        </div>
      </transition>
    </section>

    <!-- Modal crear nuevo grupo -->
    <MyModal v-model:open="isAddGroupModalOpen" size="md" :closable="true">
      <div class="space-y-4">
        <h3 class="text-xl font-semibold text-center">Create new group</h3>
        <CreateGroup
          @submit="handleCreateGroup"
          @cancel="() => (isAddGroupModalOpen = false)"
        />
      </div>
    </MyModal>
  </AppContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyAlert from "../../common/alerts/MyAlert.vue";
import AppContainer from "../../common/layouts/AppContainer.vue";
import MyModal from "../../common/modals/MyModal.vue";
import CreateGroup from "../components/CreateGroup.vue";
import GroupCard from "../components/GroupCard.vue";
import { useGroups } from "../composables/useGroups";
import type { INewGroupPayload } from "../interfaces/groups.interfaces";

const { addNewGroup, currentGroups, archivedGroups } = useGroups();

const showGroups = ref(true);
const showArchived = ref(false);
const isAddGroupModalOpen = ref(false);
const showSuccessAlert = ref(false);

// Cuando CreateGroup emite 'submit'
function handleCreateGroup(data: INewGroupPayload) {
  addNewGroup(data);
  isAddGroupModalOpen.value = false;
  showSuccessAlert.value = true;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
