<template>
  <nav
    class="flex items-center text-sm text-gray-400 mb-6 space-x-1"
    aria-label="Breadcrumb"
  >
    <span
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      @click="goTo(crumb.path)"
      :class="[
        'cursor-pointer transition-colors',
        index === breadcrumbs.length - 1
          ? 'text-gray-300 font-medium'
          : 'hover:text-blue-400',
      ]"
    >
      {{ crumb.label }}
      <span v-if="index < breadcrumbs.length - 1" class="text-gray-600">/</span>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  const result: { label: string; path: string }[] = [];

  paths.forEach((segment, i) => {
    const path = "/" + paths.slice(0, i + 1).join("/");
    result.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path,
    });
  });

  return result;
});

function goTo(path: string) {
  router.push(path);
}
</script>
