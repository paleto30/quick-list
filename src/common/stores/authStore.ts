import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));

  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem("accessToken", token);
  };

  const clearAccesstoken = () => {
    accessToken.value = null;
    localStorage.removeItem("accessToken");
  };

  const isAuthenticated = computed(() => !!accessToken.value);

  
  
  return {
    /* properties */
    accessToken,
    isAuthenticated,

    /* methods */
    setAccessToken,
    clearAccesstoken,
  };
});
