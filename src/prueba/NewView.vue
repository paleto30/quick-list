<template>
  <div class="component-name">
    <!-- 💡 Contenido del componente -->
  </div>
</template>

<script setup lang="ts">
// ✅ Props
interface Props {
  title?: string
  modelValue?: string | number | boolean
}

const otracosa = ref('')

// ✅ Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'clicked'): void
}>()

// ✅ Estado local (reactive o ref)
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

// ✅ Métodos
function handleClick() {
  emit('clicked')
  count.value++
}

// ✅ Ciclos de vida
import { onMounted } from 'vue'

onMounted(() => {
  console.log('✅ Componente montado')
})
</script>

<style scoped>

</style>
