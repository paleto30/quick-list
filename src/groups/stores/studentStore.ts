import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Person } from "../interfaces/student.interfaces";




export const useStudentStore = defineStore(
    "student",
    () => {

        const students = ref<Person[]>([]);

        const computedStudents = computed(()=> students.value)


        const addNewStudent = (student: Person) => {
            students.value.push(student)
        }

        const loadStudents = (studentsDb: Person[]) => {
            students.value = studentsDb
        }

        return {
            computedStudents,

            addNewStudent,
            loadStudents
        }

    }, { persist: true }
)