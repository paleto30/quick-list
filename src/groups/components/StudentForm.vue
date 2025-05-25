<template>
  <div>
    <form @submit.prevent="submitForm" class="space-y-3">
      <!-- Campos de texto -->
      <input
        v-model="form.dni"
        type="text"
        placeholder="documento identidad"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />
      <input
        v-model="form.name"
        type="text"
        placeholder="Nombres"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />
      <input
        v-model="form.lastName"
        type="text"
        placeholder="Apellidos"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />

      <!-- DatePicker para birthday -->
      <DatePicker v-model="form.birthday" :required="true" />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />
      <input
        v-model="form.phone"
        type="tel"
        placeholder="teléfono"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />

      <!-- Captura o carga de imagen -->
      <div class="space-y-2">
        <div v-if="form.image" class="mb-2">
          <img
            :src="form.image"
            alt="Preview"
            class="rounded w-32 h-32 object-cover border border-gray-600"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            @click="openCamera"
            class="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white"
          >
            📷 Abrir camara
          </button>

          <button
            type="button"
            @click="captureImage"
            :disabled="!videoActive"
            class="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white"
          >
            📸 Capturar
          </button>

          <button
            type="button"
            @click="clearImage"
            :disabled="!form.image && !videoActive"
            class="px-3 py-2 rounded bg-red-700 hover:bg-red-600 text-sm text-white"
          >
            ❌ limpiar
          </button>

          <label
            class="cursor-pointer px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white"
          >
            📁 cargar
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
          </label>
        </div>

        <video
          v-show="videoActive"
          ref="video"
          autoplay
          playsinline
          class="mt-2 rounded w-full max-w-xs border border-gray-700"
        />

        <canvas ref="canvas" class="hidden" />
      </div>

      <!-- Ya no hay select de estado -->

      <!-- Botones -->
      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
        >
          cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-400 text-white"
        >
          guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from "vue";
import DatePicker from "../../common/inputs/DatePicker.vue";
import type { Student } from "../interfaces/student.interfaces";

import { useAlert } from "../../common/alerts/useMyAlert";
import { useImageCapture } from "../composables/useImageCapture";

const { showAlert } = useAlert();

const emit = defineEmits<{
  (
    e: "submit",
    payload: Omit<
      Student,
      "id" | "groupId" | "createdAt" | "updatedAt" | "status"
    >
  ): void;
  (e: "cancel"): void;
}>();

const form = ref<
  Omit<Student, "id" | "groupId" | "createdAt" | "updatedAt" | "status">
>({
  dni: "",
  name: "",
  lastName: "",
  birthday: new Date(),
  email: "",
  phone: "",
  image: "",
});

const {
  video,
  canvas,
  videoActive,
  openCamera,
  captureImage,
  clearImage,
  handleFileUpload,
} = useImageCapture(toRef(form.value, "image"));

const isFormValid = computed(() => {
  return (
    form.value.dni.trim() &&
    form.value.name.trim() &&
    form.value.lastName.trim() &&
    form.value.email.trim() &&
    form.value.birthday instanceof Date &&
    !isNaN(form.value.birthday.getTime()) &&
    form.value.phone.trim() &&
    form.value.image.trim()
  );
});

function submitForm() {
  if (isFormValid.value) {
    console.log({ ...form.value });

    emit("submit", { ...form.value });
  } else {
    showAlert("Porfavor complete los campos.");
  }
}
</script>
