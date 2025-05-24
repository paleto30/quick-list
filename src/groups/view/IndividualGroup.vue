<template>
  <AppContainer>
    <button
      class="mb-2 text-sm border border-blue-500 bg-gray-800 px-2 py-1 rounded text-blue-400"
      @click="router.back()"
    >
      ← back
    </button>

    <!-- Render Header solo si encontramos el grupo -->
    <GroupHeader
      v-if="group"
      :id="group._id!"
      :institution="group.institutionName"
      :subject="group.subject"
      :code="group.referenceCode"
      :status="group.status"
    />

    <TabNavigation :tabs="tabs" v-model:currentTab="currentTab" />

    <StudentsList v-if="currentTab === 'students'" />

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
import { ClipboardList, FileText, Users } from "lucide-vue-next";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppContainer from "../../common/layouts/AppContainer.vue";
import ReusableTable from "../../common/tables/ReusableTable.vue";
import AssistanceActions from "../components/AssistanceActions.vue";
import GroupHeader from "../components/GroupHeader.vue";
import TabNavigation from "../components/TabNavigation.vue";
import StudentsList from "../components/StudentsList.vue";
import { useGroupStore } from "../groupStore";
import type { IGroup } from "../interfaces/groups.interfaces";

// router
const route = useRoute();
const router = useRouter();

// grupoId de la ruta
const groupId = route.params.id as string;

// Pinia store
const groupStore = useGroupStore();

// Computed para obtener el grupo directamente desde el array
const group = computed<IGroup | undefined>(() =>
  groupStore.groups.find((g) => g._id === groupId)
);

// Tabs
const currentTab = ref("students");
const tabs = [
  { label: "Students", value: "students", icon: Users },
  { label: "Take assistance", value: "assistance", icon: ClipboardList },
  { label: "Reports", value: "reports", icon: FileText },
];

// Opcional: redirigir si no existe el grupo
watch(group, (g) => {
  if (!g) router.replace("/groups");
});
</script>
