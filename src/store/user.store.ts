import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUserProfile } from "@/types/ui/user";

const useUserStore = defineStore(
  "user",
  () => {
    const userProfile = ref<IUserProfile | null>(null);

    function setUserProfile(user: IUserProfile) {
      userProfile.value = user;
    }

    return {
      userProfile,
      setUserProfile,
    };
  },
  {
    persist: {
      key: "userStore",
      storage: localStorage,
    },
  },
);

export default useUserStore;
