<template>
  <div
    class="min-h-screen bg-[#0a0f1a] text-white flex flex-col md:flex-row items-center justify-center p-4"
  >
    <!-- Contenedor del texto descriptivo -->
    <div
      class="order-1 md:order-2 w-full max-w-2xl text-center md:text-left rounded-2xl p-8 mb-8 md:mb-0"
    >
      <h2 class="text-3xl text-gray-200 mb-2 pb-6">Bienvenido a</h2>
      <h1
        class="text-5xl md:text-8xl text-blue-400 text-justify pl-8 p-0 lg:pb-4 font-bold mb-4"
      >
        QuickList
      </h1>
      <p
        class="text-gray-200 text-md md:text-lg font-light text-center font-bold"
      >
        La herramienta que te permite llevar <br />
        tus listas de asistencia de forma <br />
        inteligente y rápida.
      </p>
    </div>

    <!-- Contenedor del login -->
    <div
      class="order-2 md:order-2 w-full max-w-md border-0 md:border md:border-blue-400 rounded-2xl p-4"
    >
      <LoginForm @submit="handleSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAlert } from "../../common/alerts/useMyAlert";
import LoginForm from "../components/LoginForm.vue";
import { useLogin } from "../composable/useLogin";

const { showAlert } = useAlert();
const router = useRouter();
const { submitLogin } = useLogin(showAlert);

const handleSubmit = async (payload: { email: string; password: string }) => {
  await submitLogin(payload);
  router.push({ name: "Groups" });
};
</script>

<style scoped>
.container-view {
  margin: 1em;
}
</style>
