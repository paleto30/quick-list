<template>
  <div class="mt-6 overflow-auto rounded-lg border border-gray-700">
    <table
      class="min-w-full divide-y divide-gray-600 bg-gray-900 text-sm sm:text-base text-white"
    >
      <thead class="bg-gray-800">
        <tr>
          <th
            v-for="(col, i) in columns"
            :key="i"
            class="px-4 py-3 text-left font-semibold text-blue-400 tracking-wider"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          class="hover:bg-gray-800 border-t border-gray-700 transition"
        >
          <td
            v-for="(col, j) in columns"
            :key="j"
            class="px-4 py-2 text-gray-200"
          >
            {{ row[col] }}
          </td>
        </tr>

        <tr v-if="rows.length === 0">
          <td
            :colspan="columns.length"
            class="px-4 py-3 text-center text-gray-400"
          >
            No data available.
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
