<template>
  <div>
    <form @submit.prevent="submitForm" class="space-y-3">
      <input v-model="form.dni" type="text" placeholder="documento identidad"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white" />
      <input v-model="form.name" type="text" placeholder="Nombres"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white" />
      <input v-model="form.lastName" type="text" placeholder="Apellidos"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white" />

      <DatePicker v-model="form.birthday" :required="true" />

      <input v-model="form.email" type="email" placeholder="Email"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white" />
      <input v-model="form.phone" type="tel" placeholder="teléfono"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white" />

      <div class="space-y-2">
        <div v-if="form.image" class="mb-2">
          <img :src="form.image" alt="Preview" class="rounded w-32 h-32 object-cover border border-gray-600" />
        </div>

        <div class="flex flex-wrap gap-2">
          <button type="button" @click="openCamera"
            class="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white">
            📷 Abrir cámara
          </button>

          <button type="button" @click="captureImage" :disabled="!videoActive"
            class="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white">
            📸 Capturar
          </button>

          <button type="button" @click="clearImage" :disabled="!form.image && !videoActive"
            class="px-3 py-2 rounded bg-red-700 hover:bg-red-600 text-sm text-white">
            ❌ Limpiar
          </button>

          <label class="cursor-pointer px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm text-white">
            📁 Cargar
            <input type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
          </label>
        </div>

        <video v-show="videoActive" ref="video" autoplay playsinline
          class="mt-2 rounded w-full max-w-xs border border-gray-700" />

        <canvas ref="canvas" class="hidden" />
      </div>

      <div class="flex justify-end gap-2">
        <button type="button" @click="handleCancel"
          class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white">Cancelar</button>
        <button type="submit" class="px-4 py-2 rounded bg-blue-900 hover:bg-sky-600 text-white">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef, type Ref, onUnmounted } from "vue";
import DatePicker from "../../common/inputs/DatePicker.vue";
import { useAlert } from "../../common/alerts/useMyAlert";
import { useImageCapture } from "../composables/useImageCapture";
import type { Person } from "../interfaces/student.interfaces";

const { showAlert } = useAlert();

const emit = defineEmits<{
  (e: "submit", payload: FormData): void;
  (e: "cancel"): void;
}>();

// Inicialización segura del formulario con valores por defecto
const form = ref<Person>({
  _id: "",
  groupId: "",
  dni: "",
  birthday: new Date(),
  name: "",
  lastName: "",
  email: "",
  phone: "",
  image: "",
  status: "active",
});

const imageRef = toRef(form.value, "image") as Ref<string>;

const {
  video,
  canvas,
  videoActive,
  openCamera,
  captureImage,
  clearImage,
  handleFileUpload,
  stopCamera,
} = useImageCapture(imageRef);

const isFormValid = computed(() => {
  return (
    form.value.dni.trim() &&
    form.value.name.trim() &&
    form.value.lastName.trim() &&
    form.value.birthday instanceof Date &&
    !isNaN(form.value.birthday.getTime()) &&
    form.value.email.trim() &&
    form.value.phone.trim()
  );
});

function base64ToBlob(base64: string): Blob {
  const parts = base64.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "";
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

function submitForm() {
  if (!isFormValid.value) {
    showAlert("Por favor complete todos los campos.");
    return;
  }

  const formData = new FormData();
  formData.append("dni", form.value.dni);
  formData.append("name", form.value.name);
  formData.append("lastName", form.value.lastName);
  formData.append("birthday", form.value.birthday.toISOString());
  formData.append("email", form.value.email);
  formData.append("phone", form.value.phone);

  if (form.value.image) {
    if (form.value.image.startsWith("data:image")) {
      const blob = base64ToBlob(form.value.image);
      formData.append("image", blob, "captured-image.png");
    } else {
      formData.append("image", form.value.image as any);
    }
  }

  emit("submit", formData);
}

function handleCancel() {
  stopCamera();
  emit("cancel");
}

onUnmounted(() => {
  stopCamera();
});
</script>
