<script setup lang="ts">
import { ref } from "vue";
import SignInFlow from "../assets/icons/signin.svg";
import Loader from "../components/Loader/Loader.vue";
import Error from "../components/Modal/Error.vue";
import { useAuth } from "../store/features/auth";
import { useHead } from "@unhead/vue";

useHead({
  title: () => "Sign In Page",
  meta: () => [
    {
      name: "Signin Page for Omo Osaghae Associate",
      content: "This is the signin page",
      description: "Sign in for Admin",
    },
  ],
});

const auth = useAuth();

interface IUser {
  email: string;
  password: string;
}

const userObj = ref<IUser>({
  email: "",
  password: "",
});

const closeError = () => {
  auth.CLOSEMODAL();
};

const submitHandler = () => {
  auth.SIGNIN(userObj.value);
};
</script>

<template>
  <main>
    <Loader v-if="auth.state.loading" />
    <Error
      v-if="auth.state.error"
      :message="auth.state.error"
      @close="closeError"
    />

    <section class="font-SpaceGrotesk lg:px-0 sm:px-8 px-6">
      <div class="grid lg:grid-cols-8 grid-cols-4">
        <div class="lg:col-span-4 lg:block hidden">
          <div class="w-full h-screen">
            <img :src="SignInFlow" alt="Login Flow" class="w-full h-full" />
          </div>
        </div>
        <div class="lg:col-span-4 col-span-4 lg:pt-32 lg:pb-0 pt-24 pb-16">
          <form @submit.prevent="submitHandler">
            <div class="lg:w-3/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5">
              <h1
                class="text-slate-700 font-bold lg:text-3xl text-2xl lg:text-start text-center lg:mb-8 mb-8"
              >
                Welcome<span class="text-green-600 ml-1">Back!</span>
              </h1>

              <label for="" class="text-slate-700 text-sm">E-mail</label>
              <input
                type="email"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-5 mt-2 placeholder:text-slate-500 placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="name@gmail.com"
                v-model="userObj.email"
                required
              />
              <label for="" class="text-slate-700 text-sm">Password</label>
              <input
                type="password"
                class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-normal placeholder:text-sm lg:text-base text-sm text-slate-700"
                placeholder="6+ characters"
                v-model="userObj.password"
                required
              />

              <button
                class="w-full bg-green-600 py-3 outline-none text-white text-sm font-bold my-6 rounded-lg"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
