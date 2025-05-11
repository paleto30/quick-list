<template>
  <div
    class="border p-3 rounded-md text-sm sm:text-base flex items-start lg:items-center relative"
  >
    <!-- Wrapper de campos -->
    <div class="flex flex-col lg:flex-row lg:justify-between flex-1">
      <p class="mb-2 lg:mb-0 lg:flex-1 lg:text-center">
        <strong>Institution:</strong> {{ institution }}
      </p>
      <p class="mb-2 lg:mb-0 lg:flex-1 lg:text-center">
        <strong>Subject:</strong> {{ subject }}
      </p>
      <p class="lg:flex-1 lg:text-center">
        <strong>Reference code:</strong> {{ code }}
      </p>
    </div>

    <!-- Botón inline en mobile a la derecha -->
    <button
      @click="openEditor = true"
      class="block lg:hidden ml-4 text-gray-500 hover:text-gray-700"
    >
      <Edit class="w-5 h-5" />
    </button>

    <!-- Botón editar en desktop (absolute) -->
    <button
      @click="openEditor = true"
      class="hidden lg:block absolute right-3 top-3 text-gray-500 hover:text-gray-700"
    >
      <Edit class="w-5 h-5" />
    </button>

    <!-- Modal con formulario de edición -->
    <MyModal v-model:open="openEditor" size="md" closable>
      <template #default>
        <h3 class="text-lg font-semibold mb-4">Edit Group</h3>
        <CreateGroup
          :institutionName="institution"
          :subject="subject"
          :referenceCode="code"
          @submit="handleUpdate"
          @cancel="openEditor = false"
        />
      </template>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "lucide-vue-next";
import { ref } from "vue";
import MyModal from "../../common/modals/MyModal.vue";
import CreateGroup from "./CreateGroup.vue";

import { useGroupStore } from "../groupStore";
import type { INewGroupPayload } from "../interfaces/groups.interfaces";

// Ahora recibimos el ID del grupo
const props = defineProps<{
  id: string;
  institution: string;
  subject: string;
  code: string;
}>();

// Pinia store
const groupStore = useGroupStore();

const openEditor = ref(false);

// Al recibir submit, actualizamos directamente el store
function handleUpdate(payload: INewGroupPayload) {
  openEditor.value = false;
  groupStore.updateGroup(props.id, payload);
}
</script>
