<template>
  <div>
    <button
      @click="openForm = true"
      class="border border-blue-400 bg-gray-800 px-4 py-2 rounded hover:bg-blue-900 transition mt-5"
    >
      + Add Student
    </button>

    <ReusableTable
      :columns="['Nombre', 'Apellidos', 'Edad', 'Email', 'Celular', 'Estado']"
      :rows="
        students.map((s) => ({
          Nombre: s.name,
          Apellidos: s.lastName,
          Edad: s.age,
          Email: s.email,
          Celular: s.phone,
          Estado: s.status,
        }))
      "
    />

    <MyModal v-model:open="openForm" size="md" closable>
      <template #default>
        <h3 class="text-lg font-semibold mb-4">Create Student</h3>
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

const openForm = ref(false);

// Simulamos datos, en realidad vendrían de store o API
const students = ref<Student[]>([
  {
    id: "1",
    groupId: "asdas",
    dni: "10074389045",
    name: "Alice Danni",
    lastName: "Johnson",
    age: 28,
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
    age: 28,
    image: "",
    phone: "3223218127",
    email: "bob@mail.com",
    status: "inactive",
  },
]);

function handleCreate(newStudent: Omit<Student, "id">) {
  // En producción generar id o pedir al backend
  students.value.push({ id: String(Date.now()), ...newStudent });
  openForm.value = false;
}
</script>
