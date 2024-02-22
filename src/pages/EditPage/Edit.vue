<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Loader from "../../components/Loader/Loader.vue";
import Error from "../../components/Modal/Error.vue";
import Success from "../../components/Modal/Success.vue";
import { usePost } from "../../store/features/post";

const post = usePost();
const { params } = useRoute();

onMounted(() => {
  post.GETPROPERTYPOST(params.slug);
});

const postContent = ref({
  propertyTitle: "",
  price: "",
  longitude: "",
  latitude: "",
  propertyHTML: "",
  propertyPhoto: "",
  propertyPhotoName: "",
});

watchEffect(() => {
  postContent.value.propertyTitle = post.state.propertyDetail[0]?.propertyTitle;
  postContent.value.price = post.state.propertyDetail[0]?.price;
  postContent.value.longitude = post.state.propertyDetail[0]?.longitude;
  postContent.value.latitude = post.state.propertyDetail[0]?.latitude;
  postContent.value.propertyHTML = post.state.propertyDetail[0]?.propertyHTML;
});

const imageInputRef = ref();
const img = ref();

const imageInputClick = () => imageInputRef.value.click();

const imageChange = (evt: any) => {
  const file = evt.target.files[0];
  postContent.value.propertyPhoto = file;
  postContent.value.propertyPhotoName = file.name;
  img.value = URL.createObjectURL(file);
};

const submitHandler = () => {
  post.UPDATEPOST(postContent.value);
};

const closeError = () => {
  post.CLOSEMODAL();
};
</script>

<template>
  <main>
    <Loader v-if="post.state.loading" />

    <div v-else>
      <section class="font-SpaceGrotesk lg:px-20 sm:px-8 px-6">
        <Error
          v-if="post.state.error"
          :message="post.state.error"
          @close="closeError"
        />

        <div
          v-else
          class="lg:w-4/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5 lg:py-16 py-16"
        >
          <Success v-if="post.state.success" :message="post.state.success" />
          <div>
            <div class="grid place-content-end mb-10">
              <div class="">
                <a
                  href="/admin"
                  class="px-8 py-3 text-base bg-green-400 rounded-md text-white font-medium"
                  >Dashboard</a
                >
              </div>
            </div>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="grid place-content-center mb-6" v-if="img">
              <div class="sm:w-96 h-32 w-64 relative">
                <img :src="img" alt="" class="h-full w-full object-cover" />
                <div
                  @click="imageInputClick"
                  class="absolute bottom-2 right-2 p-2 rounded-full bg-white border-2 border-green-200 grid place-content-center"
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
                </div>
              </div>
            </div>
            <div v-else>
              <div class="grid place-content-center mt-7 lg:mb-14 mb-10">
                <img
                  v-if="post.state.propertyDetail[0]?.photoURL == ''"
                  src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                  alt="Image Placeholder"
                />

                <img
                  v-else
                  :src="post.state.propertyDetail[0]?.photoURL"
                  :alt="post.state.propertyDetail[0]?.propertyPhotoName"
                />
              </div>
              <div
                @click="imageInputClick"
                class="border-[1px] border-dashed border-green-400 grid place-content-center w-5/5 h-28 mb-6 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-cloud-arrow-up fill-green-400"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path
                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                  />
                </svg>
              </div>
            </div>

            <input
              type="file"
              name=""
              id=""
              class="hidden"
              ref="imageInputRef"
              accept="image/png, image/jpg, image/jpeg"
              @change="imageChange"
            />
            <label for="Title" class="text-slate-700 text-sm">Title</label>
            <input
              type="text"
              id="Title"
              class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
              v-model="postContent.propertyTitle"
            />

            <QuillEditor
              toolbar="full"
              theme="snow"
              v-model:content="postContent.propertyHTML"
              name="propertyHTML"
              contentType="html"
              placeholder="Body"
            />

            <button
              class="w-full bg-green-500 py-3 outline-none text-white text-sm font-bold my-6 rounded-lg"
            >
              Publish
            </button>
          </form>
        </div>
      </section>
    </div>
  </main>
</template>

<!-- <template>
  <main>
    <Loader v-if="post.state.loading" />

    <div v-else>
      <section class="font-SpaceGrotesk lg:px-20 sm:px-8 px-6">
        <Error
          v-if="post.state.error"
          :message="post.state.error"
          @close="closeError"
        />

        <div
          v-else
          class="lg:w-4/5 lg:mx-auto sm:w-3/5 sm:mx-auto w-5/5 lg:py-16 py-16"
        >
          <Success v-if="post.state.success" :message="post.state.success" />
          <div>
            <div class="grid place-content-end mb-8">
              <div class="">
                <a
                  href="/admin"
                  class="px-8 py-3 text-sm bg-green-400 rounded-md text-white font-medium"
                  >Dashboard</a
                >
              </div>
            </div>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="grid place-content-center mb-6" v-if="img">
              <div class="sm:w-96 h-32 w-64 relative">
                <img :src="img" alt="" class="h-full w-full object-cover" />
                <div
                  @click="imageInputClick"
                  class="absolute bottom-2 right-2 p-2 rounded-full bg-white border-2 border-green-200 grid place-content-center"
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
                </div>
              </div>
            </div>
            <div v-else>
              <div class="grid place-content-center mt-7 lg:mb-14 mb-10">
                <img
                  v-if="post.state.propertyDetail[0]?.photoURL == ''"
                  src="https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
                  alt="Image Placeholder"
                />

                <img
                  v-else
                  :src="post.state.propertyDetail[0]?.photoURL"
                  :alt="post.state.propertyDetail[0]?.propertyPhotoName"
                />
              </div>
              <div
                @click="imageInputClick"
                class="border-[1px] border-dashed border-green-400 grid place-content-center w-5/5 h-16 mb-6 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-cloud-arrow-up fill-green-400"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path
                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                  />
                </svg>
              </div>
            </div>

            <input
              type="file"
              name=""
              id=""
              class="hidden"
              ref="imageInputRef"
              accept="image/png, image/jpg, image/jpeg"
              @change="imageChange"
            />
            <label for="" class="text-slate-700 text-sm">Title</label>
            <input
              type="text"
              class="outline-none border-[1px] border-gray-100 focus:border-green-400 px-4 py-2 rounded-lg w-full mb-4 mt-2 placeholder:text-slate-500 placeholder:font-serif placeholder:font-normal placeholder:text-sm text-base text-slate-700"
              placeholder=""
              v-model="post.state.propertyDetail[0]?.propertyTitle"
            />

            <p class="text-slate-700 text-sm mt-3 mb-2">Property Type</p>

            <div class="my-1 flex flex-row items-center gap-2">
              <label for="Property" class="text-slate-700 text-sm">Land</label>
              <input
                type="radio"
                id="Property"
                value="Land"
                v-model="postContent.property"
              />
            </div>
            <div class="mt-1 mb-7 flex flex-row items-center gap-2">
              <label for="Building" class="text-slate-700 text-sm"
                >Building</label
              >
              <input
                type="radio"
                id="Building"
                value="Building"
                v-model="postContent.property"
              />
            </div>

            <QuillEditor
              toolbar="full"
              theme="snow"
              v-model:content="post.state.propertyDetail[0]?.propertyHTML"
              contentType="html"
              placeholder="Body"
            />

            <button
              class="w-full bg-green-500 py-3 outline-none text-white text-sm font-bold my-6 rounded-lg"
            >
              Publish
            </button>
          </form>
        </div>
      </section>
    </div>
  </main>
</template> -->

<style scoped>
:deep(.ql-editor) {
  min-height: 300px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-color: #f3f4f6;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-color: #f3f4f6;
}
</style>
