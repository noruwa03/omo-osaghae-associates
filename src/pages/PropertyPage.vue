<script setup lang="ts">
import { usePost } from "../store/features/post";
import { useAuth } from "../store/features/auth";
import { onMounted } from "vue";
import { useHead } from "@unhead/vue";
import Success from "../components/Modal/Success.vue";

const post = usePost();
const auth = useAuth();

useHead({
  title: () => "Property listing",
  meta: () => [
    {
      name: "Property listing in Omo Osaghae Associate porfolio",
      content: "Property listing in Omo Osaghae Associate porfolio",
      description: "Porfolio of Omo Osaghae Associate",
    },
  ],
});

onMounted(() => {
  post.GETPOST();
});

const delPost = (val: any) => {
  post.DELETEPOST(val);
};
</script>
<template>
  <section class="font-SpaceGrotesk lg:px-20 sm:px-8 px-6">
    <Success v-if="post.state.success" :message="post.state.success" />
    <div v-if="post.state.loading" class="grid place-content-center my-8">
      <div class="loader"></div>
    </div>
    <div v-else>
      <div v-if="post.state.error" class="text-center text-base text-red-400">
        An error occured
      </div>
      <div v-else>
        <div v-if="post.state.data.length === 0">
          <div class="grid place-content-center mt-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-list-columns-reverse"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M0 .5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 .5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10A.5.5 0 0 1 4 .5Zm-4 2A.5.5 0 0 1 .5 2h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 4h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2A.5.5 0 0 1 .5 8h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm-4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm4 0a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
          </div>
          <div class="text-center text-xl font-medium mt-6">No posts yet</div>
        </div>
        <div
          v-else
          class="grid lg:grid-cols-8 sm:grid-cols-8 grid-cols-2 gap-8 my-12"
        >
          <div
            class="lg:col-span-2 sm:col-span-4 col-span-2"
            v-for="data in post.state.data"
            :key="data.id"
          >
            <div
              class="shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] rounded-md pb-6 relative"
            >
              <div class="w-full h-48 overflow-hidden">
                <RouterLink
                  :to="{ name: 'Property', params: { slug: data.id } }"
                >
                  <img
                    v-if="data.photoURL == ''"
                    src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                    alt="Image Placeholder"
                    class="w-full h-full object-cover hover:scale-110 transition-all duration-150"
                  />
                  <img
                    v-else
                    :src="data.photoURL"
                    :alt="data.propertyPhotoName"
                    class="w-full h-full object-cover hover:scale-110 transition-all duration-150"
                  />
                </RouterLink>
              </div>
              <div v-if="auth.state.user !== null">
                <div class="absolute top-3 right-4 flex items-center space-x-4">
                  <RouterLink
                    :to="{ name: 'Edit', params: { slug: data.id } }"
                    class="grid place-content-center p-2 rounded-full bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                      />
                    </svg>
                  </RouterLink>
                  <div
                    @click="
                      delPost({ id: data.id, photo: data.propertyPhotoName })
                    "
                    class="grid place-content-center p-2 rounded-full bg-gray-100 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="px-4 mt-3">
                <h1
                  class="lg:text-base text-2xl text-slate-900 font-semibold capitalize"
                >
                  <RouterLink
                    :to="{ name: 'Property', params: { slug: data.id } }"
                    class="hover:text-green-600"
                  >
                    {{ data.propertyTitle }}
                    <span v-if="data.propertyTitle.length >= 23"> ...</span>
                  </RouterLink>
                </h1>
                <h2
                  class="text-xs text-slate-900 capitalize font-semibold mt-2"
                >
                  Posted on:
                  {{ new Date(data.createdAt).toDateString() }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
