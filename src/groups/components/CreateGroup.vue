<template>
  <div>
    <MyAlert
      v-if="showAlert"
      title="Formulario incompleto"
      type="warning"
      :duration="3000"
      @close="showAlert = false"
    />

    <form @submit.prevent="submitForm" class="space-y-3">
      <input
        v-model="form.institutionName"
        type="text"
        placeholder="Institution name"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />
      <input
        v-model="form.subject"
        type="text"
        placeholder="Subject"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />
      <input
        v-model="form.referenceCode"
        type="text"
        placeholder="Reference code"
        class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
      />

      <div class="flex justify-end gap-2">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded bg-sky-600 hover:bg-sky-400"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import MyAlert from "../../common/alerts/MyAlert.vue";
import type { INewGroupPayload } from "../interfaces/groups.interfaces";

// 1) Defino explícitamente los props (camelCase):
const props = defineProps({
  institutionName: { type: String, default: "" },
  subject: { type: String, default: "" },
  referenceCode: { type: String, default: "" },
});

// 2) Las posibles emisiones:
const emit = defineEmits<{
  (e: "submit", payload: INewGroupPayload): void;
  (e: "cancel"): void;
}>();

// 3) Form inicializándose con los props:
const form = ref<INewGroupPayload>({
  institutionName: props.institutionName,
  subject: props.subject,
  referenceCode: props.referenceCode,
});

const showAlert = ref(false);
const isFormValid = computed(
  () =>
    form.value.institutionName.trim() !== "" &&
    form.value.subject.trim() !== "" &&
    form.value.referenceCode.trim() !== ""
);

function submitForm() {
  if (isFormValid.value) {
    emit("submit", { ...form.value });
    showAlert.value = false;
  } else {
    showAlert.value = true;
  }
}
</script>
