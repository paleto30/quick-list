<template>
  <div>
    <!-- 🔘 Botón toggle (solo mobile) -->
    <button
      class="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg md:hidden"
      @click="toggleSidebar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- 🧭 Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full flex flex-col justify-between bg-[#1a1d26] text-gray-100 shadow-xl z-50 transition-all duration-300 ease-in-out',
        isMobile
          ? isMobileMenuOpen
            ? 'w-64'
            : 'w-0 overflow-hidden'
          : computedOpen
          ? 'w-64'
          : 'w-16',
      ]"
    >
      <!-- 🔝 Header -->
      <div
        class="relative flex items-center gap-3 p-3 border-b border-gray-800"
      >
        <img src="../../public/quickBlue.png" alt="Logo" class="w-10 h-10" />
        <h1 v-if="computedOpen" class="text-xl font-semibold whitespace-nowrap">
          MyApp
        </h1>

        <!-- 📌 Botón para colapsar (solo desktop) -->
        <button
          v-if="!isMobile"
          class="absolute -right-3 top-6/6 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-gray-100 p-2 rounded-full shadow-md border border-gray-700 transition-all hover:scale-105 active:scale-95 z-30"
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
          type="button"
        >
          <svg
            v-if="isSidebarOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <!-- 📋 Menú principal -->
      <nav
        class="flex-1 justify-center p-2 py-5 space-y-2 overflow-y-auto overflow-hidden"
      >
        <RouterLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.path"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          active-class="bg-gray-800"
          @click="handleMenuClick"
        >
          <div
            class="flex items-center justify-center w-8 h-8 bg-gray-700 text-sm font-semibold rounded flex-shrink-0"
          >
            {{ item.label[0] }}
          </div>
          <span
            v-show="computedOpen"
            class="transition-all duration-300 ease-in-out"
          >
            {{ item.label }}
          </span>
        </RouterLink>
      </nav>

      <!-- 👤 Usuario -->
      <div class="relative p-2 border-t border-gray-800">
        <div
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          @click="toggleUserMenu"
          data-user-toggle
        >
          <img
            :src="user.avatar"
            alt="User"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span
            v-show="computedOpen"
            class="font-medium truncate transition-all duration-300 ease-in-out"
          >
            {{ user.name }}
          </span>
          <svg
            v-if="computedOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-auto"
            :class="{ 'rotate-180': isUserMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </aside>

    <!-- 📂 Dropdown flotante -->
    <transition name="fade">
      <div
        v-if="isUserMenuOpen"
        ref="userMenuRef"
        :class="[
          'absolute bottom-18  bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300',
          computedOpen ? 'left-2 w-60' : 'left-18 w-48',
        ]"
        style="z-index: 60"
      >
        <!-- 👤 Perfil -->
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors"
        >
          👤 <span>Profile</span>
        </a>

        <!-- ⚙️ Configuración -->
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors"
        >
          ⚙️ <span>Settings</span>
        </a>

        <!-- 🧭 Separador -->
        <div class="border-t border-gray-700 my-1"></div>

        <!-- 🚪 Cerrar sesión -->
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 text-red-400 transition-colors"
        >
          🚪 <span>Logout</span>
        </a>
      </div>
    </transition>

    <!-- 🧩 Overlay (mobile) -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      class="fixed inset-0 bg-black/40 z-40"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  isSidebarOpen: { type: Boolean, default: true },
  isMobile: { type: Boolean, default: false },
  isMobileMenuOpen: { type: Boolean, default: false },
});

const emit = defineEmits([
  "update:isSidebarOpen",
  "update:isMobile",
  "update:isMobileMenuOpen",
]);

const isSidebarOpen = ref(props.isSidebarOpen);
const isMobileMenuOpen = ref(props.isMobileMenuOpen);
const isMobile = ref(props.isMobile);
const isUserMenuOpen = ref(false);

// 🔗 Referencia al contenedor del menú desplegable
const userMenuRef = ref<HTMLElement | null>(null);

watch(isSidebarOpen, (val) => emit("update:isSidebarOpen", val));
watch(isMobile, (val) => emit("update:isMobile", val));
watch(isMobileMenuOpen, (val) => emit("update:isMobileMenuOpen", val));

const user = ref({
  name: "Andrés Galvis",
  avatar:
    "https://ui-avatars.com/api/?name=Andres+Galvis&background=2563eb&color=fff",
});

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Groups", path: "/groups" },
  // { label: "Users", path: "/app/users" }, // si la agregas después
  // { label: "Reports", path: "/app/reports" }, // igual aquí
];

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) isSidebarOpen.value = false;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("mousedown", handleClickOutside);
});

const computedOpen = computed(() => isSidebarOpen.value || isMobile.value);

const toggleSidebar = () => {
  if (isMobile.value) {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  } else {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
};

const toggleUserMenu = () => (isUserMenuOpen.value = !isUserMenuOpen.value);

const handleMenuClick = () => {
  if (!isMobile.value && !isSidebarOpen.value) isSidebarOpen.value = true;
};

// 🧠 Detectar clics fuera del menú
function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  const userMenu = userMenuRef.value;
  const userButton = document.querySelector("[data-user-toggle]");

  // Si no hay menú abierto, nada que hacer
  if (!isUserMenuOpen.value || !userMenu || !userButton) return;

  // Si clic dentro del dropdown o dentro del botón -> no cerrar
  if (userMenu.contains(target) || userButton.contains(target)) {
    return;
  }

  // Clic fuera → cerrar menú
  isUserMenuOpen.value = false;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

[v-show] {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

[v-show="false"] {
  opacity: 0;
  transform: translateX(-10px);
}

.router-link-active {
  background-color: #2563eb; /* azul */
  color: white;
}
</style>
