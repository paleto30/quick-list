<template>
  <div class="max-w-md mx-auto mb-5">
    <label for="date" class="block input-label text-white">
      Birthday <span v-if="required" class="text-sky-500">*</span>
    </label>

    <div class="flex justify-center">
      <input
        id="date"
        type="date"
        v-model="selectedDate"
        class="input-field rounded-md border-1 border-gray-300 bg-transparent p-2 text-white placeholder-white"
      />
    </div>
    <div
      v-if="day && month && year"
      class="mt-1 text-sky-400 text-center text-sm"
    >
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { computed } from "vue";

const selectedDate = ref("");
const day = ref("");
const month = ref("");
const year = ref("");

const props = defineProps<{
  required?: boolean;
  modelValue: Date | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
}>();

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const date = new Date(selectedDate.value);
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return `${date.getDate()} de ${
    monthNames[date.getMonth()]
  } del ${date.getFullYear()}`;
});

// Emitir el valor de la fecha seleccionada para el modelo
watch(selectedDate, (newVal) => {
  if (newVal) {
    emit("update:modelValue", new Date(newVal)); // Emitir la fecha completa
  } else {
    emit("update:modelValue", null); // Enviar null si no se selecciona fecha
  }
});

// Sincronización del v-model entre el padre y el hijo
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      selectedDate.value = newVal.toISOString().split("T")[0]; // Sincronizamos el valor de modelValue con selectedDate
    } else {
      selectedDate.value = ""; // Si no hay fecha, vaciamos el input
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.input-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1); /* Hace blanco el ícono */
  cursor: pointer;
}

input:hover {
  cursor: pointer;
}
</style>
