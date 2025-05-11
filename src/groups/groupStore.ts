import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { IGroup, INewGroupPayload } from "./interfaces/groups.interfaces";

export const useGroupStore = defineStore(
  "group",
  () => {
    const groups = ref<IGroup[]>([
      {
        id: "grp001",
        institutionName: "Universidad Nacional",
        subject: "Matemáticas Discretas",
        referenceCode: "MATDIS-2025-A",
        status: "active",
        createdAt: new Date("2025-01-15T10:00:00Z"),
        updatedAt: new Date("2025-03-01T12:30:00Z"),
      },
      {
        id: "grp002",
        institutionName: "Instituto Tecnológico de Estudios Superiores",
        subject: "Programación Orientada a Objetos",
        referenceCode: "POO-2025-B",
        status: "archived",
        createdAt: new Date("2024-11-20T09:00:00Z"),
        updatedAt: new Date("2025-01-10T14:15:00Z"),
      },
      {
        id: "grp003",
        institutionName: "Escuela Politécnica Nacional",
        subject: "Algoritmos y Estructuras de Datos",
        referenceCode: "AED-2025-C",
        status: "active",
        createdAt: new Date("2025-02-10T08:45:00Z"),
        updatedAt: new Date("2025-02-28T17:20:00Z"),
      },
    ]);

    const group = ref<IGroup | null>(null);

    const setGroup = (newGroup: IGroup) => {
      group.value = newGroup;
    };

    const clearGroup = () => {
      group.value = null;
    };

    const addNewGroup = (group: INewGroupPayload) => {
      const newGroup: IGroup = {
        ...group,
        id: crypto.randomUUID(),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      groups.value.push(newGroup);
    };

    const activeGroups = computed(() =>
      groups.value.filter((group) => group.status === "active")
    );
    const archivedGroups = computed(() =>
      groups.value.filter((group) => group.status === "archived")
    );

    const updateGroup = (id: string, payload: INewGroupPayload) => {
      const idx = groups.value.findIndex((g) => g.id === id);

      if (idx !== -1) {
        groups.value[idx] = {
          ...groups.value[idx],
          ...payload,
          updatedAt: new Date(),
        };
      }
    };

    const loadGroupsFromApi = async () => {
      // Realiza una llamada a la API para cargar los grupos
      //   const response = await fetch("/api/groups");
      //   const data = await response.json();
      //   groups.value = data;
    };

    return {
      //properties
      group,
      groups,

      //methods
      activeGroups,
      archivedGroups,
      addNewGroup,
      updateGroup,
      setGroup,
      clearGroup,
    };
  },
  {
    persist: true,
  }
);
