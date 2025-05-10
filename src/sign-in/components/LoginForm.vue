<template>
  <form>
    <!-- Título -->
    <h2 class="text-3xl text-blue-400 text-center mb-6">
      Iniciar sesión
    </h2>

    <!-- email input -->
    <InputForm
      v-model="email"
      name="email"
      label="Correo electronico"
      type="email"
      placeholder="ejemplo@dominio.com"
      :required="true"
    />

    <!-- password -->
    <InputForm
      v-model="password"
      name="passwor"
      label="Contraseña"
      type="password"
      placeholder="********"
      :required="true"
    />

    <ButtonForm class="mb-2 mt-3" type="submit">Acceder</ButtonForm>

    <!-- Enlace a registro -->
    <div class="mt-6 text-center text-sm text-gray-300 ">
      ¿Necesitas una cuenta?
      <RouterLink
        to="/sign-up"
        class="text-blue-400 hover:underline hover:text-blue-300 transition"
      >
        Regístrate
      </RouterLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputForm from "../../common/inputs/InputForm.vue";
import ButtonForm from "../../common/inputs/ButtonForm.vue";

const email = ref<string>("");
const password = ref<string>("");
</script>

<style scoped></style>
