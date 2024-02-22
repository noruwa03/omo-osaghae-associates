<script setup lang="ts">
import { ref } from "vue";

const toggleMenu = ref<HTMLDivElement>();
const navMenu = ref<HTMLDivElement>();

const menuHandler = () => {
  toggleMenu.value?.classList.toggle("hamburger-toggle");
  navMenu.value?.classList.toggle("hidden");
};
</script>

<template>
  <nav
    class="font-SpaceGrotesk lg:grid lg:grid-cols-8 lg:h-20 h-14 lg:items-center bg-white border-b-[1px] border-gray-100 sticky top-0 z-30 lg:px-14 sm:px-8 px-6"
  >
    <a
      href="/"
      class="lg:col-span-3 lg:relative lg:top-0 lg:left-0 fixed top-4 left-6 z-50 lg:text-3xl text-lg font-semibold"
    >
      <span class="text-black">Omo</span>
      <span class="text-green-600 ml-1">Osaghae</span>
    </a>
    <div
      ref="navMenu"
      class="lg:col-span-5 lg:grid lg:relative fixed top-0 left-0 place-content-end w-full lg:h-full h-screen lg:bg-transparent hidden bg-white z-40"
    >
      <ul
        class="lg:-translate-y-4 -translate-y-0 lg:mt-0 mt-16 lg:pl-0 pl-3 flex lg:flex-row flex-col lg:items-center items-start lg:space-y-0 space-y-7 lg:space-x-6 space-x-0 lg:text-base text-slate-700 font-normal w-full h-full"
      >
        <li>
          <a href="/property" class="px-3 py-2 hover:text-green-500"
            >Property Listing</a
          >
        </li>

        <li>
          <RouterLink to="/auth/signin" class="px-3 py-2 hover:text-green-500"
            >Signin</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="lg:hidden block" ref="toggleMenu">
      <div
        class="fixed top-7 right-6 w-8 h-[2px] bg-black rounded-full before:w-8 before:h-[2px] before:bg-black before:rounded-full before:content-[''] before:absolute before:-translate-y-2 before:transition-all before:duration-150 after:w-8 after:h-[2px] after:bg-black after:rounded-full after:content-[''] after:absolute after:translate-y-2 after:transition-all after:duration-150 z-40"
        @click="menuHandler"
      ></div>
    </div>
  </nav>
</template>
