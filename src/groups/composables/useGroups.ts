import { ref } from "vue";
import { useGroupStore } from "../groupStore";
import type { IGroup, INewGroupPayload } from "../interfaces/groups.interfaces";
import { apiFetch } from "../../api/api-client";

export const useGroups = (
  alertHandler?: (msg: string, type?: string, title?: string) => void
) => {
  const groupsStore = useGroupStore();

  // formulario basico para creacion de grupo
  const formNewGroup = ref<Partial<IGroup>>({
    institutionName: "",
    subject: "",
    referenceCode: "",
  });

  const addNewGroup = async (group: INewGroupPayload) => {
    const result = await apiFetch("/group", {
      method: "POST",
      body: JSON.stringify(group),
    });

    if (!result.success) {
      let msg = result.error?.message || "Error al obtener grupos";
      alertHandler!(msg, "warning");
      return;
    }

    groupsStore.addNewGroup(result.data);
    return;
  };

  async function editGroup(id: string, payload: INewGroupPayload) {
    const result = await apiFetch(`/group/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    if (!result.success) {
    }

    groupsStore.updateGroup(id, payload);
  }

  async function loadGroupsFromDb() {
    const result = await apiFetch("/group");

    if (!result.success) {
      let msg = result.error?.message || "Error al obtener grupos";
      alertHandler!(msg, "warning");
      return;
    }

    groupsStore.setGroups(result.data);
    return;
  }

  return {
    // properties
    formNewGroup,

    // methods
    addNewGroup,
    editGroup,
    loadGroupsFromDb,
  };
};
