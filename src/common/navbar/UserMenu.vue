<template>
  <div
    class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50"
  >
    <button
      @click="logout"
      class="block w-full text-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md"
    >
      Cerrar sesión
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["logout"]);

function logout() {
  emit("logout");
}
</script>

<style scoped>
/* Si quieres ajustar más estilos o animaciones, los puedes agregar aquí */
</style>
