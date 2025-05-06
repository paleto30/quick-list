<template>
  <div class="base-input">
    <label v-if="label" :for="name" class="input-label">{{ label }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="input-field"
    />
  </div>
</template>

<!-- script -->
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  modelValue: string | number;
  type?: "text" | "password" | "email";
  name: string;
  label?: string;
  placeholder?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
<!-- end script -->

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.input-label {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
