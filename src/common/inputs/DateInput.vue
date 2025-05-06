<template>
  <div class="mb-6">
    <label class="block text-white text-lg mb-2 font-[cursive]">Birthday</label>
    <div class="flex justify-center space-x-4">
      <!-- Día -->
      <input
        v-model="day"
        type="number"
        min="1"
        max="31"
        placeholder="DD"
        class="w-16 text-center py-2 border-2 border-gray-200 rounded-md bg-transparent text-white placeholder-white outline-none"
      />
      <!-- Mes -->
      <input
        v-model="month"
        type="number"
        min="1"
        max="12"
        placeholder="MM"
        class="w-16 text-center py-2 border-2 border-gray-200 rounded-md bg-transparent text-white placeholder-white outline-none"
      />
      <!-- Año -->
      <input
        v-model="year"
        type="number"
        min="1900"
        max="2100"
        placeholder="YYYY"
        class="w-24 text-center py-2 border-2 border-gray-200 rounded-md bg-transparent text-white placeholder-white outline-none"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const day = ref("");
const month = ref("");
const year = ref("");

// Puedes emitir un evento si quieres que el padre reciba la fecha:
const emit = defineEmits(["update:birthdate"]);

watch([day, month, year], () => {
  emit("update:birthdate", {
    day: day.value,
    month: month.value,
    year: year.value,
  });
});
</script>
