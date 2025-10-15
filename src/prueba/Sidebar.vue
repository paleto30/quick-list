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
    <aside :class="sidebarClasses">
      <!-- 🔝 Header (sustituir por este bloque) -->
      <div
        class="relative flex items-center gap-3 p-4 border-b border-gray-800"
      >
        <img src="../../public/quickBlue.png" alt="Logo" class="w-10 h-10" />
        <h1 v-if="computedOpen" class="text-xl font-semibold whitespace-nowrap">
          MyApp
        </h1>

        <!-- 📌 Botón para fijar/colapsar (solo desktop) -->
        <!-- Usamos v-if="!isMobile" (template unwrap) para no renderizar en mobile -->
        <button
          v-if="!isMobile"
          class="absolute -right-3 top-6/6 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-gray-100 p-2 rounded-full shadow-md border border-gray-700 transition-all hover:scale-105 active:scale-95 z-30"
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
          type="button"
        >
          <!-- Flecha: izquierda = colapsar, derecha = expandir -->
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
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto overflow-hidden">
        <a
          v-for="item in menuItems"
          :key="item.label"
          href="#"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          @click="handleMenuClick"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span v-if="computedOpen">{{ item.label }}</span>
        </a>
      </nav>

      <!-- 👤 Usuario -->
      <div class="relative p-2 border-t border-gray-800">
        <div
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
          @click="toggleUserMenu"
        >
          <img
            :src="user.avatar"
            alt="User"
            class="w-10 h-10 rounded-full object-cover"
          />
          <span v-if="computedOpen" class="font-medium truncate">
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

        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="isUserMenuOpen"
            class="absolute bottom-20 left-2 right-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden"
          >
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              <SettingsIcon class="w-5 h-5" />
              <span>Settings</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 text-red-400 transition-colors"
            >
              <LogoutIcon class="w-5 h-5" />
              <span>Logout</span>
            </a>
          </div>
        </transition>
      </div>
    </aside>

    <!-- 🧩 Overlay (mobile) -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      class="fixed inset-0 bg-black/40 z-40"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

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

/* ----------------- Estado general ----------------- */
const isSidebarOpen = ref(props.isSidebarOpen);
const isMobileMenuOpen = ref(props.isMobileMenuOpen);
const isMobile = ref(props.isMobile);
const isUserMenuOpen = ref(false);

watch(isSidebarOpen, (val) => emit("update:isSidebarOpen", val));
watch(isMobile, (val) => emit("update:isMobile", val));
watch(isMobileMenuOpen, (val) => emit("update:isMobileMenuOpen", val));

/* ----------------- Usuario ----------------- */
const user = ref({
  name: "Andrés Galvis",
  avatar:
    "https://ui-avatars.com/api/?name=Andres+Galvis&background=2563eb&color=fff",
});

/* ----------------- Menú ----------------- */
const menuItems = [
  { label: "Dashboard", icon: "HomeIcon" },
  { label: "Groups", icon: "GroupIcon" },
  { label: "Users", icon: "UsersIcon" },
  { label: "Reports", icon: "ReportsIcon" },
];

/* ----------------- Detección pantalla ----------------- */
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) isSidebarOpen.value = false;
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

/* ----------------- Cálculo visual ----------------- */
const computedOpen = computed(() => isSidebarOpen.value || isMobile.value);

const sidebarClasses = computed(() => [
  "fixed top-0 left-0 h-full bg-gray-900 text-gray-100 transition-all duration-300 flex flex-col justify-between shadow-xl z-50",
  isMobile.value
    ? isMobileMenuOpen.value
      ? "w-64"
      : "w-0 overflow-hidden"
    : computedOpen.value
    ? "w-64"
    : "w-20",
]);

/* ----------------- Acciones ----------------- */
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

/* ----------------- Íconos simples (inline SVG) ----------------- */
const HomeIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75h-15A.75.75 0 013 21V9.75z"/></svg>`,
};
const UsersIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M15 11a4 4 0 10-8 0 4 4 0 008 0z"/></svg>`,
};
const ReportsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14l-6-3-6 3z"/></svg>`,
};
const SettingsIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317a1 1 0 011.35-.936l.937.312a1 1 0 01.686.686l.312.937a1 1 0 01-.936 1.35A1.002 1.002 0 0011.827 8a1 1 0 01-1.35.936l-.937-.312a1 1 0 01-.686-.686l-.312-.937a1 1 0 01.936-1.35z"/></svg>`,
};
const LogoutIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/></svg>`,
};
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
</style>
