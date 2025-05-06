<!-- src/components/register/StepTwo.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="text-3xl text-blue-400 text-center mb-6 font-[cursive]">
      Paso 2
    </h2>

    <!-- email input -->
    <InputForm
      v-model="form.email"
      name="email"
      label="Correo Electrónico"
      type="email"
    />

    <!-- password input -->
    <InputForm
      v-model="form.password"
      name="password"
      label="Contraseña"
      type="password"
    />

    <!-- password confirm input -->
    <InputForm
      v-model="form.passwordConfirm"
      name="passwordConfirm"
      label="Confirmar Contraseña"
      type="password"
    />

    <!-- button -->
    <ButtonForm class="mb-2 mt-3" type="submit">Siguiente paso</ButtonForm>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputForm from "../../common/inputs/InputForm.vue";
import ButtonForm from "../../common/inputs/ButtonForm.vue";

// Props y emits para v-model y navegación
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue", "next"]);

// Computed para trabajar con v-model en objeto
const form = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSubmit = () => {
  if (form.value.password !== form.value.passwordConfirm) {
    alert("Las contraseñas no coinciden.");
    return;
  }
  emit("update:modelValue", form.value); // Emitir el modelo actualizado
  emit("next"); // Avanzar al siguiente paso
};
</script>
