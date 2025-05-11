<template>
  <div class="mt-6 overflow-auto">
    <table class="min-w-full border border-gray-500 text-sm sm:text-base">
      <thead>
        <tr>
          <th
            v-for="(col, i) in columns"
            :key="i"
            class="px-2 py-1 border-b border-gray-500 text-left"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i" class="border-t border-gray-600">
          <td v-for="(col, j) in columns" :key="j" class="px-2 py-1">
            {{ row[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: string[];
  rows: Record<string, any>[];
}>();
</script>
