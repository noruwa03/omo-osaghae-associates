<script setup lang="ts">
import { usePost } from "../../store/features/post";
import { useAuth } from "../../store/features/auth";
import { onMounted } from "vue";
import Success from "../../components/Modal/Success.vue";

const post = usePost();
const auth = useAuth();

onMounted(() => {
  post.GETPOST();
});

const delPost = (val: any) => {
  post.DELETEPOST(val);
};
</script>

<template>
  <section class="font-SpaceGrotesk lg:px-16 sm:px-8 px-6 lg:py-14 py-14">
    <Success v-if="post.state.success" :message="post.state.success" />
    <div
      class="flex md:flex-row flex-col-reverse md:items-center items-start justify-between mb-3"
    >
      <h1 class="lg:text-3xl lg:mb-6 mb-6 text-lg font-bold">
        Welcome Back Admin
      </h1>
      <div
        @click="auth.SIGNOUT"
        class="mb-6 cursor-pointer px-8 py-3 bg-red-400 sm:text-base text-sm rounded-md text-white font-medium"
      >
        Logout
      </div>

      <div className="fixed bottom-6 lg:right-6 right-4 z-10">
        <RouterLink
          to="/admin/create"
          class="grid place-content-center py-4 px-4 rounded-full bg-red-400 text-white font-medium sm:mt-0 mt-2 shadow-[0_0px_4px_-1.76px_rgba(0,0,0,0.3)] shadow-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-plus-lg fill-white stroke-white"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </RouterLink>
      </div>
    </div>

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
        <div v-else>
          <div className="overflow-x-auto my-3">
            <table
              className="table-auto overflow-x-auto w-full divide-y divide-gray-100 text-sm"
            >
              <thead>
                <tr
                  className="text-gray-700 flex flex-row items-center justify-between mb-3 gap-4"
                >
                  <th className="w-64 text-start font-semibold">
                    Property Name
                  </th>
                  <th className="w-44 text-start font-semibold">Date</th>
                  <th className="w-44 text-start font-semibold">Amount</th>
                  <th className="w-44 text-start font-semibold">Location</th>
                  <th className="w-40 text-start font-semibold">Invoice</th>
                </tr>
              </thead>
              <tbody
                className="[&>*:nth-child(odd)]:bg-gray-50 [&>*:nth-child(even)]:bg-white"
              >
                <tr
                  className="flex flex-row items-center justify-between py-3 gap-3"
                  v-for="data in post.state.data"
                  :key="data.id"
                >
                  <td className="w-64 text-start">
                    <p className="font-medium">
                      {{ data.propertyTitle.slice(0, 25) }}
                      <span v-if="data.propertyTitle.length >= 25"> ...</span>
                    </p>
                  </td>
                  <td className="w-44 text-start text-[#737373]">
                    {{ new Date(data.createdAt).toDateString() }}
                  </td>
                  <td className="w-44 text-start font-semibold">
                    ₦ {{ new Intl.NumberFormat("en-US").format(data.price) }}
                  </td>
                  <td class="w-44 text-start">
                    {{ data.longitude }} , {{ data.latitude }}
                  </td>
                  <td
                    className="w-40 text-start flex flex-row items-center justify-start gap-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash cursor-pointer"
                      viewBox="0 0 16 16"
                      @click="
                        delPost({ id: data.id, photo: data.propertyPhotoName })
                      "
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                      />
                    </svg>

                    <RouterLink
                      :to="{ name: 'Edit', params: { slug: data.id } }"
                      class="hover:text-green-600 font-medium"
                    >
                      View
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
