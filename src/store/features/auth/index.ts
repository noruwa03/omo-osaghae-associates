import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../../../lib/firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useAuth = defineStore("auth", () => {
  const state = ref({
    user: JSON.parse(window.localStorage.getItem("user") as string) || null,
    loading: false,
    error: "",
  });
  const SIGNIN = async (payload: any) => {
    state.value.loading = true;

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      const userObj = {
        uid: result.user.uid,
        email: result.user.email,
      };

      window.localStorage.setItem("user", JSON.stringify(userObj));

      state.value.loading = false;

      window.location.href = "/admin";
    } catch (error: string | any) {
      state.value.loading = false;
      state.value.error = "Invalid credentials";
    }
  };

  const SIGNOUT = async () => {
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("user");
        window.location.replace("/");
      })
      .catch((error: string | any) => {
        console.log(error.message);
      });
  };

  const CLOSEMODAL = () => {
    state.value.error = "";
  };
  return { state, SIGNIN, CLOSEMODAL, SIGNOUT };
});
