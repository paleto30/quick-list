import { ref } from "vue";

type AlertType = "success" | "warning" | "error" | "info";

const visible = ref(false);
const message = ref("");
const title = ref("");
const type = ref<AlertType>("info");

const showAlert = (
  msg: string,
  alertType: AlertType = "info",
  alertTitle = "Aviso"
) => {
  message.value = msg;
  type.value = alertType;
  title.value = alertTitle;
  visible.value = true;
};

const closeAlert = () => {
  visible.value = false;
};

export function useAlert() {
  return {
    visible,
    message,
    title,
    type,
    showAlert,
    closeAlert,
  };
}
