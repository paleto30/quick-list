<template>
  <div>
    <!-- Paso 1: Nombre, Apellidos y Fecha de nacimiento -->
    <StepOne
      v-if="currentStep === 1"
      :modelValue="registerform"
      @update:modelValue="(val) => (registerform = val)"
      @next="nextStep"
    />

    <!-- Paso 2: Correo, Contraseña y Confirmar Contraseña -->
    <StepTwo
      v-if="currentStep === 2"
      :modelValue="registerform"
      @update:modelValue="(val) => (registerform = val)"
      @submit="handleSubmitStepTwo"
    />

    <!-- Paso 3: Código de Verificación -->
    <StepThree
      v-if="currentStep === 3"
      :modelValue="verificationForm"
      @update:modelValue="(val) => (verificationForm = val)"
      @submit="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";

// Datos del registro inicial
const registerform = ref({
  name: "",
  lastName: "",
  birthdate: null,
  email: "",
  password: "",
  passwordConfirm: "",
});

// Datos del paso 3 (verificación)
const verificationForm = ref({
  email: "",
  verificationCode: "",
});

// Control del paso actual
const currentStep = ref(1);

// Avanzar al siguiente paso
const nextStep = () => {
  currentStep.value++;
};

// Llamado a la API cuando se completa el paso 2
const handleSubmitStepTwo = () => {
  try {

    const {passwordConfirm, ...dataToSend} = registerform.value
    // Simular envío a la API
    console.log("Registro enviado:", dataToSend);

    // Guardar el correo para el paso 3
    verificationForm.value.email = registerform.value.email;

    // Avanzar al paso 3
    nextStep();
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Hubo un error al registrar, por favor intenta nuevamente.");
  }
};

// Enviar código de verificación (paso 3)
const submitForm = () => {
  console.log("Verificando código:", verificationForm.value);
  // Aquí deberías llamar a la API para validar el código
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
