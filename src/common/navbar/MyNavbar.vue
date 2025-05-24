<template>
  <header
    class="w-full bg-transparent border-b border-white/20 px-5 sm:px-6 md:px-10 py-3 flex justify-between items-center"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <div class="w-8 h-6 rounded-full">
        <img src="../../../public/vite.svg" alt="" srcset="" />
      </div>
      <span class="text-blue-400 font-semibold text-3xl md:text-3xl"
        >QuickList</span
      >
      <!-- Modificado -->
    </div>

    <!-- User Icon -->
    <div class="flex items-center justify-center">
      <span class="text-sky-500 mr-2 drop-shadow-md font-semibold">{{
        name
      }}</span>
      <button
        aria-label="User profile"
        class="w-9 h-9 bg-sky-600 hover:bg-sky-600 text-white rounded-full shadow flex items-center justify-center transition-all"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      <!-- Mostrar el menú sólo si showMenu es true -->
      <UserMenu v-if="showMenu" @logout="handleLogout" class="right-3  top-12" />
    </div>
    <!-- Alerta de éxito global -->
    <MyAlert
      v-if="showAlert"
      :title="alertMessage"
      type="info"
      :duration="3000"
      @close="showAlert = false"
    />
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { apiFetch } from "../../api/api-client";
import MyAlert from "../alerts/MyAlert.vue";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import UserMenu from "./UserMenu.vue";

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const alertMessage = ref<string>("");
const showAlert = ref(false);
const showMenu = ref(false);

const userName = ref("");
const name = computed(() => capitalizarNombre(userName.value));

onMounted(() => {
  userName.value = userStore.user?.name!;
});

const handleAlert = (message: string) => {
  alertMessage.value = message;
  showAlert.value = true;
};

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function capitalizarNombre(nombre: string): string {
  if (!nombre) return "";
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

async function handleLogout() {
  showMenu.value = false;

  const res = await apiFetch("/auth/logout", {
    method: "POST",
  });

  if (!res.success) {
    handleAlert(`${res.error?.message || "Error al cierre de sesion"} ❌`);
    userStore.cleanUser();
    authStore.clearAccesstoken();
    router.push({ name: "login" });
    return;
  }
  handleAlert("Cerrando sesión...");

  userStore.cleanUser();
  authStore.clearAccesstoken();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  router.push({ name: "login" });
}

// Cerrar menú si click fuera del menú
function onClickOutside(event: MouseEvent) {
  const menu = document.querySelector(".absolute.right-0.mt-2");
  const button = event.target as HTMLElement;
  if (
    showMenu.value &&
    menu &&
    !menu.contains(event.target as Node) &&
    !button.closest('button[aria-label="User profile"]')
  ) {
    showMenu.value = false;
  }
}

window.addEventListener("click", onClickOutside);
</script>

<style scoped>
.text-relieve {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
