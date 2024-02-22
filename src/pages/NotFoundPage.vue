<script setup lang="ts">
import { useHead } from "@unhead/vue";

useHead({
  title: () => "404 page",
  meta: () => [
    {
      name: "404 page",
      content: "Looks like you're lost",
      description: "The page you are looking for is not available!",
    },
  ],
});
</script>

<template>
  <section class="font-SpaceGrotesk lg:px-16 sm:px-8 px-6 lg:py-16 py-14 my-20">
    <h1 class="lg:text-9xl text-7xl font-black text-green-700 text-center">
      404
    </h1>

    <div class="text-center">
      <h3 class="text-lg text-gray-700 my-3">Looks like you're lost</h3>

      <p class="mb-9 text-lg text-gray-700">
        The page you are looking for is not available!
      </p>

      <a
        href="/"
        class="px-8 py-3 mx-auto bg-green-300/20 border-2 border-gray-300 rounded-full text-base text-green-700 font-bold uppercase"
      >
        Go to Home
      </a>
    </div>
  </section>
</template>
