<template>
  <AppContainer>
    <button
      class="mb-4 text-sm border px-2 py-1 rounded"
      @click="router.back()"
    >
      ← back
    </button>

    <!-- Render Header solo si encontramos el grupo -->
    <GroupHeader
      v-if="group"
      :id="group.id!"
      :institution="group.institutionName"
      :subject="group.subject"
      :code="group.referenceCode"
    />

    <TabNavigation :tabs="tabs" v-model:currentTab="currentTab" />

    <AssistanceActions v-if="currentTab === 'assistance'" />

    <ReusableTable
      v-if="currentTab === 'assistance'"
      :columns="['Name', 'Status']"
      :rows="[
        { Name: 'Alice', Status: 'Present' },
        { Name: 'Bob', Status: 'Absent' },
      ]"
    />
  </AppContainer>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppContainer from "../../common/layouts/AppContainer.vue";
import AssistanceActions from "../components/AssistanceActions.vue";
import GroupHeader from "../components/GroupHeader.vue";
import TabNavigation from "../components/TabNavigation.vue";
import ReusableTable from "../../common/tables/ReusableTable.vue";
import { ClipboardList, FileText, Users } from "lucide-vue-next";

import type { IGroup } from "../interfaces/groups.interfaces";
import { useGroupStore } from "../groupStore";

// router
const route = useRoute();
const router = useRouter();

// grupoId de la ruta
const groupId = route.params.id as string;

// Pinia store
const groupStore = useGroupStore();

// Computed para obtener el grupo directamente desde el array
const group = computed<IGroup | undefined>(() =>
  groupStore.groups.find((g) => g.id === groupId)
);


// Tabs
const currentTab = ref("assistance");
const tabs = [
  { label: "Take assistance", value: "assistance", icon: ClipboardList },
  { label: "Students", value: "students", icon: Users },
  { label: "Reports", value: "reports", icon: FileText },
];

// Opcional: redirigir si no existe el grupo
watch(group, (g) => {
  if (!g) router.replace("/groups");
});
</script>
