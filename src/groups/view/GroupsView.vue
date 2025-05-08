<template>
  <AppContainer>
    <!-- Encabezado de grupos con botón encima a la derecha -->
    <section class="mb-4">
      <!-- Botón alineado a la derecha y encima -->
      <div class="flex justify-end mb-2">
        <button
          class="text-sm sm:text-base border border-blue-400 px-3 py-1 rounded-md text-blue-400 hover:bg-blue-900 transition whitespace-nowrap"
        >
          add group +
        </button>
      </div>

      <!-- Encabezado clickeable -->
      <div
        class="cursor-pointer hover:bg-gray-800 px-2 py-2 rounded-md transition w-full mb-4"
        @click="showGroups = !showGroups"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>👥</span>
            <h2 class="text-xl font-semibold">Groups</h2>
          </div>
          <span class="text-xl text-gray-400">
            {{ showGroups ? "▾" : "▸" }}
          </span>
        </div>
        <div class="w-full border-t border-gray-600 mt-2"></div>
      </div>

      <!-- Contenido expandible -->
      <transition name="fade">
        <div
          v-show="showGroups"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <GroupCard
            title="UTS"
            subject="Differential calculus"
            code="E - 1 95"
            border="blue"
          />
          <GroupCard
            title="UTS"
            subject="Software arquitecture"
            code="A - 1 96"
            border="green"
          />
          <GroupCard
            title="UTS"
            subject="Differential calculus"
            code="E - 1 95"
            border="blue"
          />
          <GroupCard
            title="UTS"
            subject="Software arquitecture"
            code="A - 1 96"
            border="green"
          />
        </div>
      </transition>
    </section>

    <!-- Sección archivados (sin cambios) -->
    <section class="mt-8">
      <div
        class="relative mb-2 cursor-pointer hover:bg-gray-800 px-2 py-2 rounded-md transition mb-4"
        @click="showArchived = !showArchived"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>📂</span>
            <h2 class="text-xl font-semibold">Archived groups</h2>
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
            title="UTS"
            subject="Differential calculus"
            code="E - 1 95"
            border="blue"
          />
        </div>
      </transition>
    </section>
  </AppContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppContainer from "../../common/layouts/AppContainer.vue";
import GroupCard from "../components/GroupCard.vue";

const showGroups = ref(true);
const showArchived = ref(false);
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
