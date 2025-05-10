<template>
  <header
    class="w-full bg-transparent border-b border-white/20 px-5 sm:px-6 md:px-10 py-3 flex justify-between items-center"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <div class="w-6 h-6 rounded-full border border-blue-400"></div>
      <span class="text-blue-400 font-semibold text-3xl md:text-3xl"
        >QuickList</span
      >
      <!-- Modificado -->
    </div>

    <!-- User Icon -->
    <div>
      <button
        aria-label="User profile"
        class="text-white hover:text-blue-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
// No logic needed yet; just structure/styling
</script>

<style scoped>
/* Puedes añadir decoraciones adicionales aquí si necesitas */
</style>
