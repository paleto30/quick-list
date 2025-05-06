<template>
  <form @submit.prevent="handleSubmit">
    <!-- Título -->
    <h2 class="text-3xl text-blue-400 text-center mb-6 font-[cursive]">
      Registrarse
    </h2>

    <!-- name input -->
    <InputForm v-model="form.name" name="name" label="Nombres" type="text" />

    <!-- lastName -->
    <InputForm
      v-model="form.lastName"
      name="lastName"
      label="Apellidos"
      type="text"
    />

    <!-- date input -->
    <DateInput @update:birthdate="handleBirthdate" />

    <!-- botón -->
    <ButtonForm class="mb-2 mt-3" type="submit">Siguiente paso</ButtonForm>

    <!-- Enlace a login -->
    <div class="mt-6 text-center text-sm text-gray-300 font-[cursive]">
      ¿Ya tienes una cuenta?
      <RouterLink
        to="/sign-in"
        class="text-blue-400 hover:underline hover:text-blue-300 transition"
      >
        Acceder
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import InputForm from "../../common/inputs/InputForm.vue";
import ButtonForm from "../../common/inputs/ButtonForm.vue";
import DateInput from "../../common/inputs/DateInput.vue";

// Props y emits para v-model y navegación
const props = defineProps<{ modelValue: any }>();
const emit = defineEmits(["update:modelValue", "next"]);

// Computed para trabajar con v-model en objeto
const form = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleBirthdate = (date: {
  day: number;
  month: number;
  year: number;
}) => {
  const birth = new Date(date.year, date.month - 1, date.day);
  form.value.birthdate = birth;
};

const handleSubmit = () => {
  emit("update:modelValue", form.value); // asegúrate de emitir el modelo actualizado
  emit("next"); // avanzar al siguiente paso
};
</script>
