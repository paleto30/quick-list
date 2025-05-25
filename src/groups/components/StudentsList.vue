<template>
  <div>
    <button
      @click="openForm = true"
      class="border border-blue-400 bg-gray-800 px-4 py-2 rounded hover:bg-blue-900 transition mt-5"
    >
      + agregar estudiante
    </button>

    <ReusableTable
      :columns="['Nombre', 'Apellidos', 'Edad', 'Email', 'Celular', 'Estado']"
      :rows="
        students.map((s) => ({
          Nombre: s.name,
          Apellidos: s.lastName,
          Edad: calculateAge(s.birthday),
          Email: s.email,
          Celular: s.phone,
          Estado: s.status,
        }))
      "
    />

    <MyModal v-model:open="openForm" size="md" closable>
      <template #default>
        <h3 class="text-lg font-semibold mb-4">Crear estudiante</h3>
        <StudentForm @submit="handleCreate" @cancel="openForm = false" />
      </template>
    </MyModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReusableTable from "../../common/tables/ReusableTable.vue";
import MyModal from "../../common/modals/MyModal.vue";
import StudentForm from "./StudentForm.vue";
import type { Student } from "../interfaces/student.interfaces";
import { calculateAge } from "../utils/calculate-age";

const openForm = ref(false);

const students = ref<Student[]>([
  {
    id: "1",
    groupId: "asdas",
    dni: "10074389045",
    name: "Alice Danni",
    lastName: "Johnson",
    birthday: new Date("1995-06-15"),
    image: "",
    phone: "3155113022",
    email: "alice@mail.com",
    status: "active",
  },
  {
    id: "2",
    groupId: "asdasasd",
    dni: "10074389045",
    name: "Bob Jhoin",
    lastName: "Smith",
    birthday: new Date("1994-09-30"),
    image: "",
    phone: "3223218127",
    email: "bob@mail.com",
    status: "inactive",
  },
]);

function handleCreate(
  newStudent: Omit<
    Student,
    "id" | "createdAt" | "status" | "updatedAt" | "groupId"
  >
) {
  students.value.push({
    id: String(Date.now()),
    groupId: "", // O un valor real por defecto si aplica
    status: "active", // O un valor predeterminado
    createdAt: new Date(),
    updatedAt: new Date(),
    ...newStudent,
  });
  openForm.value = false;
}
</script>
