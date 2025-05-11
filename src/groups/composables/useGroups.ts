import { ref } from "vue";
import { useGroupStore } from "../groupStore";
import type { IGroup, INewGroupPayload } from "../interfaces/groups.interfaces";

export const useGroups = () => {
  const groupsStore = useGroupStore();

  // formulario basico para creacion de grupo
  const formNewGroup = ref<Partial<IGroup>>({
    institutionName: "",
    subject: "",
    referenceCode: "",
  });

  const addNewGroup = (group: INewGroupPayload) => {
    const newGroup: IGroup = {
      ...group,
      id: crypto.randomUUID(),
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    groupsStore.addNewGroup(newGroup);
  };

  function editGroup(id: string, payload: INewGroupPayload) {
    groupsStore.updateGroup(id, payload);
  }

  return {
    // properties
    formNewGroup,

    // methods
    addNewGroup,
    editGroup,
  };
};
