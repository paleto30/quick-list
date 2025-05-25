<template>
  <div>
    <button @click="openForm = true"
      class="border border-blue-400 bg-gray-800 px-4 py-2 rounded hover:bg-blue-900 transition mt-5">
      + agregar estudiante
    </button>

    <ReusableTable :columns="['Nombre', 'Apellidos', 'Edad', 'Email', 'Celular', 'Estado']" :rows="students.map((s) => ({
      Nombre: s.name,
      Apellidos: s.lastName,
      Edad: calculateAge(s.birthday),
      Email: s.email,
      Celular: s.phone,
      Estado: s.status,
    }))
      " />

    <MyModal v-model:open="openForm" size="md" closable>
      <template #default>
        <h3 class="text-lg font-semibold mb-4">Crear estudiante</h3>
        <StudentForm @submit="handleCreate" @cancel="openForm = false" />
      </template>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAlert } from "../../common/alerts/useMyAlert";
import MyModal from "../../common/modals/MyModal.vue";
import ReusableTable from "../../common/tables/ReusableTable.vue";
import { useStudent } from "../composables/useStudent";
import { calculateAge } from "../utils/calculate-age";
import StudentForm from "./StudentForm.vue";
import { useStudentStore } from "../stores/studentStore";

const { showAlert } = useAlert();
const openForm = ref(false);

const props = defineProps<{
  groupId: string;
}>();

const studentsStore = useStudentStore()
const { createStudent, loadStudentsFromDB } = useStudent(showAlert);



onMounted(async () => {
  await loadStudentsFromDB(props.groupId)
  console.log('carga los datos');
})

const students = computed(() => studentsStore.computedStudents);

async function handleCreate(payload: FormData) {
  await createStudent(props.groupId, payload);
  openForm.value = false;
}
</script>
