<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      :class="[
        'alert',
        alertTypeClass,
        'fixed',
        'top-4',
        'z-50',
        alertPosition,
      ]"
      class="max-w-sm w-full p-4 rounded-md shadow-lg text-white"
    >
      <div class="flex justify-between items-center">
        <div class="font-semibold">{{ title }}</div>
        <button @click="closeAlert" class="text-lg">×</button>
      </div>
      <div>{{ message }}</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from "vue";

const props = defineProps<{
  title: string;
  message?: string;
  type?: "success" | "warning" | "error" | "info";
  duration?: number;
}>();

// emitimos el cierre para que el padre reponga su v‑if
const emit = defineEmits<{
  (e: "close"): void;
}>();

const visible = ref(true);

// Color según tipo
const alertTypeClass = ref("bg-yellow-500");
switch (props.type) {
  case "success":
    alertTypeClass.value = "bg-green-500";
    break;
  case "error":
    alertTypeClass.value = "bg-red-500";
    break;
  case "info":
    alertTypeClass.value = "bg-blue-500";
    break;
  case "warning":
  default:
    alertTypeClass.value = "bg-yellow-500";
    break;
}

// Posición responsive
const alertPosition = ref("right-4");
onMounted(() => {
  if (window.innerWidth < 768) {
    alertPosition.value = "left-2 right-2 top-4"; // márgenes laterales en móvil
  }
});

const closeAlert = () => {
  visible.value = false;
  emit("close");
};

onMounted(() => {
  const alertDuration = props.duration ?? 5000;
  setTimeout(closeAlert, alertDuration);
});
</script>

<style scoped>
.alert {
  animation: slide-in 0.5s ease-out;
}
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
