<!-- src/layouts/BaseLayout.vue -->
<template>
  <div class="min-h-screen bg-[#12151c] text-white">
    <MyNavbar class="shadow-md z-10" />
    <main class="max-w-screen-xl mx-auto px-4 sm:px-8 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import MyNavbar from '../navbar/MyNavbar.vue';

</script>
