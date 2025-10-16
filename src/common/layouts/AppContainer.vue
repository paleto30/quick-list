<template>
  <div class="min-h-screen flex flex-col bg-[#12151c] text-white">
    <!-- 🧭 Sidebar (solo desktop) -->
    <Sidebar v-if="!isMobile" v-model:isSidebarOpen="isSidebarOpen" />

    <!-- 🧩 Contenido principal -->
    <main
      class="flex-1 transition-all duration-300 overflow-y-auto"
      :class="isMobile ? 'pb-16' : isSidebarOpen ? 'ml-64' : 'ml-20'"
    >
      <div class="min-h-screen px-4 sm:px-8 py-6">
        <!-- 🧭 Breadcrumb -->
        <NavBreadcrumb class="mb-6" />

        <!-- 🔁 Aquí se inyectarán las vistas de tus rutas hijas -->
        <router-view />
      </div>
    </main>

    <!-- 📱 BottomNav (solo mobile) -->
    <BottomNav v-if="isMobile" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Sidebar from "../../prueba/Sidebar.vue";
import BottomNav from "../../prueba/BottomNav.vue";
import NavBreadcrumb from "../navbar/NavBreadcrumb.vue";

/* --- Estado --- */
const isSidebarOpen = ref(true);
const isMobile = ref(false);

/* --- Detección de pantalla --- */
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (isMobile.value) isSidebarOpen.value = false;
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
