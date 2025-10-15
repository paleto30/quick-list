<template>
  <div class="min-h-screen bg-[#12151c] text-white flex relative">
    <!-- 🧭 Sidebar fija -->
    <Sidebar
      v-model:isSidebarOpen="isSidebarOpen"
      v-model:isMobile="isMobile"
      v-model:isMobileMenuOpen="isMobileMenuOpen"
    />

    <!-- 🧩 Contenedor principal -->
    <main
      class="flex-1 transition-all duration-300 px-4 sm:px-8 py-6 overflow-y-auto"
      :style="mainStyle"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Sidebar from "../../prueba/Sidebar.vue";

// 🧠 Estado compartido
const isSidebarOpen = ref(true);
const isMobile = ref(false);
const isMobileMenuOpen = ref(false);

// 🖥️ Detectar tamaño de pantalla
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

// 📏 Ajuste del espacio dinámico
const mainStyle = computed(() => {
  // 📱 En mobile: sidebar flota sobre el contenido
  if (isMobile.value) {
    return {
      marginLeft: "0",
      filter: isMobileMenuOpen.value ? "blur(2px)" : "none",
    };
  }

  // 💻 En desktop: sidebar empuja el contenido
  return {
    marginLeft: isSidebarOpen.value ? "16rem" /* 64 */ : "5rem" /* 20 */,
  };
});
</script>
