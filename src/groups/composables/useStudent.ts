import { apiFetch } from "../../api/api-client";
import type { AlertType } from "../../common/alerts/useMyAlert";
import { useStudentStore } from "../stores/studentStore";




export const useStudent = (
    alertHandler: (title: string, msg?: string, type?: AlertType) => void
) => {

    const studentStore = useStudentStore()

    const createStudent = async (groupId: string, payload: FormData) => {

        const result = await apiFetch(`/group/${groupId}/students`, {
            method: 'POST',
            body: payload
        })

        if (!result.success) {
            alertHandler(result.error?.message)
            return
        }

        studentStore.addNewStudent(result.data)
        alertHandler(`Creado exitosamente. ✅`)
    }



    const loadStudentsFromDB = async (groupId: string) => {

        const result = await apiFetch(`/group/${groupId}/students`, {
            method: 'GET'
        })

        if (!result.success) {
            alertHandler(`Problemas para obtener los estudiantes.`, undefined, 'warning')
            return
        }

        studentStore.loadStudents(result.data)
        return
    }



    return {
        createStudent,
        loadStudentsFromDB
    }

}