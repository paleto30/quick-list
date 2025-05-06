<!-- src/components/register/StepThree.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <p class="text-blue-400 text-center mb-6 font-[cursive]">
      Se ha enviado un código de verificación al correo electrónico.
    </p>

    <InputForm
      v-model="form.verificationCode"
      name="verificationCode"
      label="Código de Verificación"
      type="text"
    />

    <!-- button -->
    <ButtonForm class="mb-2 mt-3" type="submit">Verificar</ButtonForm>
  </form>
</template>

<script setup lang="ts">
import InputForm from "../../common/inputs/InputForm.vue";
import ButtonForm from "../../common/inputs/ButtonForm.vue";
import { computed } from "vue";

// Props y emits para v-model
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue", "submit"]);

// Computed para trabajar con v-model
const form = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSubmit = () => {
  console.log('codigo verificacion: ', form.value.verificationCode);
  emit("submit", form.value); // Envía la solicitud al servidor
};
</script>
