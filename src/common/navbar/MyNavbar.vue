<template>
  <header
    class="w-full bg-transparent border-b border-white/20 px-5 sm:px-6 md:px-10 py-3 flex justify-between items-center"
  >
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <div class="w-9 h-7 rounded-full">
        <img src="../../../public/quickBlue.png" alt="" />
      </div>
      <button class="text-blue-400 font-semibold text-3xl md:text-3xl">
        QuickList
      </button>
    </div>

    <!-- User Icon -->
    <div class="flex items-center justify-center" ref="menuContainer">
      <span class="text-sky-500 mr-2 drop-shadow-md font-semibold">{{
        name
      }}</span>
      <button
        aria-label="User profile"
        class="w-9 h-9 bg-sky-700 hover:bg-sky-500 text-white rounded-full shadow flex items-center justify-center transition-all"
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

      <!-- Mostrar menú solo si showMenu es true -->
      <UserMenu v-if="showMenu" @logout="handleLogout" class="right-3 top-12" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { apiFetch } from "../../api/api-client";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import UserMenu from "./UserMenu.vue";
import { useAlert } from "../alerts/useMyAlert"; // Ajusta ruta si hace falta

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const alert = useAlert();

const showMenu = ref(false);
const menuContainer = ref<HTMLElement | null>(null);

// Nombre capitalizado reactivo
const name = computed(() => {
  const n = userStore.user?.name || "";
  return n ? capitalizarNombreCompleto(n) : "";
});

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function capitalizarNombreCompleto(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    )
    .join(" ");
}

async function handleLogout() {
  showMenu.value = false;

  const res = await apiFetch("/auth/logout", {
    method: "POST",
  });

  if (!res.success) {
    alert.showAlert(`${res.error?.message || "Error al cierre de sesión"} ❌`);
    userStore.cleanUser();
    authStore.clearAccesstoken();
    router.push({ name: "login" });
    return;
  }

  alert.showAlert("Cerrando sesión...");

  userStore.cleanUser();
  authStore.clearAccesstoken();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  router.push({ name: "login" });
}

// Cerrar menú si click fuera del menú
function onClickOutside(event: MouseEvent) {
  if (!menuContainer.value) return;

  const target = event.target as Node;

  if (
    showMenu.value &&
    menuContainer.value &&
    !menuContainer.value.contains(target)
  ) {
    showMenu.value = false;
  }
}

onMounted(() => {
  window.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", onClickOutside);
});
</script>

<style scoped>
.text-relieve {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
