<template>
  <div
    :class="[
      'rounded-xl border-2 p-6 text-center relative',
      borderColor,
      'sm:h-32 sm:p-4 md:h-40 md:p-6 lg:h-56 lg:p-8',
      'transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-700 cursor-pointer',
    ]"
  >
    <div class="flex flex-col justify-center h-full">
      <!-- Título -->
      <div class="text-lg md:text-2xl lg:text-2xl font-semibold">
        {{ title }}
      </div>

      <!-- Asignatura -->
      <div class="text-sm md:text-xl lg:text-1xl">{{ subject }}</div>

      <!-- Código -->
      <div class="text-xs md:text-sm lg:text-base text-gray-400">
        {{ code }}
      </div>
    </div>
    <div class="absolute top-2 right-2 text-gray-400">⋮</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  subject: string;
  code: string;
  border: string;
}>();

const borderColor = computed(() => {
  return props.border === "green" ? "border-green-500" : "border-blue-400";
});
</script>

<style scoped>
/* Tailwind CSS handles most of the responsiveness */


</style>
