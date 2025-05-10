import { ref } from "vue";
import type {
  IRegisterData,
  ISignUpVerification,
} from "../interfaces/register.interface";
import router from "../../router";

export const useRegister = () => {
  //----------- properties -----------//
  // Control del paso actual
  const currentStep = ref(1);

  // Datos del registro inicial
  const registerform = ref<IRegisterData>({
    name: "",
    lastName: "",
    birthdate: null,
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Datos del paso 3 (verificación)
  const verificationForm = ref<ISignUpVerification>({
    email: "",
    verificationCode: "",
  });

  //---------------- methods--------------//

  // siguiente paso
  const nextStep = () => {
    currentStep.value++;
    console.log(currentStep.value);
  };

  // paso anterior
  const previousStep = () => {
    console.log(currentStep.value);
    currentStep.value--;
    console.log(currentStep.value);
  };

  // Llamado a la API cuando se completa el paso 2
  const handleSubmitStepTwo = () => {
    try {
      const { passwordConfirm, ...dataToSend } = registerform.value;
      // Simular envío a la API
      console.log("Registro enviado:", dataToSend);

      // Guardar el correo para el paso 3
      verificationForm.value.email = registerform.value.email;

      // Avanzar al paso 3
      nextStep();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un error al registrar, por favor intenta nuevamente.");
    }
  };

  // Enviar código de verificación (paso 3)
  const submitVerification = () => {
    console.log("Verificando código:", verificationForm.value);
    // Aquí deberías llamar a la API para validar el código
    router.push({ name: "Groups" });
  };

  return {
    // properties
    registerform,
    verificationForm,
    currentStep,

    // methods
    nextStep,
    previousStep,
    handleSubmitStepTwo,
    submitVerification,
  };
};
