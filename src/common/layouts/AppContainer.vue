<template>
  <div class="min-h-screen bg-[#12151c] text-white">
    <MyNavbar class="shadow-md z-10" />
    <main class="max-w-screen-xl mx-auto px-4 sm:px-8 py-6">
      <slot />
    </main>
    <MyAlert
      v-if="visible"
      :title="title"
      :message="message"
      :type="type"
      @close="closeAlert"
    />
  </div>
</template>

<script setup lang="ts">
import MyAlert from "../alerts/MyAlert.vue";
import { useAlert } from "../alerts/useMyAlert";
import MyNavbar from "../navbar/MyNavbar.vue";
const { visible, message, title, type, closeAlert } = useAlert();
</script>
