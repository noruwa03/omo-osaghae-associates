<script setup lang="ts">
import { onMounted, watchEffect, ref } from "vue";
import { useHead } from "@unhead/vue"
import L from "leaflet";
import { useRoute } from "vue-router";
import { usePost } from "../../store/features/post";
import Loader from "../../components/Loader/Loader.vue";
import Error from "../../components/Modal/Error.vue";

const post = usePost();
const { params } = useRoute();
const map = ref<any>();
const mapContainer = ref<any>();

// const location = ref({
//   long: 9.88778,
//   lat: 6.786420,
// });

onMounted(() => {
  post.GETPROPERTYPOST(params.slug);
});

watchEffect(() => {
  if (post.state.propertyDetail[0]?.longitude) {
    map.value = L.map(mapContainer.value).setView(
      [
        post.state.propertyDetail[0]?.longitude,
        post.state.propertyDetail[0]?.latitude,
      ],
      13
    );
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map.value);

    L.marker([
      post.state.propertyDetail[0]?.longitude,
      post.state.propertyDetail[0]?.latitude,
    ]).addTo(map.value);
  }
});

useHead({
  title: () => post.state.propertyDetail[0]?.propertyTitle,
  meta: () => [
    {
      name: post.state.propertyDetail[0]?.propertyTitle,
      content: post.state.propertyDetail[0]?.propertyHTML,
      description: post.state.propertyDetail[0]?.propertyTitle
    }
  ]
})

// const getLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition((position: any) => {
//       location.value.lat = position.coords.latitude;
//       location.value.long = position.coords.longitude;
//       map.value.setView([location.value.lat, location.value.long], 13);
//       L.marker([location.value.lat, location.value.long]).addTo(map.value)
//     });
//   }
// };

// getLocation();

const closeError = () => {
  post.CLOSEMODAL();
};
</script>

<template>
  <main class="font-SpaceGrotesk lg:pt-8 lg:pb-28 pt-6 pb-20 lg:px-16 sm:px-8 px-6">
    <div>
      <Loader v-if="post.state.loading" />

      <div v-else>
        <Error
          v-if="post.state.error"
          :message="post.state.error"
          @close="closeError"
        />
        <section v-else>
          <div class="grid place-content-center lg:mb-14 mb-10">
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
          <h1 class="lg:text-5xl text-3xl font-bold text-black mb-3">
            {{ post.state.propertyDetail[0]?.propertyTitle }}
          </h1>
          <h2 class="lg:text-3xl text-lg font-medium text-black mb-2">
            Listing price: ₦ {{ new Intl.NumberFormat("en-US").format(post.state.propertyDetail[0]?.price) }}
          </h2>
          <span class="lg:text-sm text-xs font-bold text-black">{{
            new Date(post.state.propertyDetail[0]?.updatedAt).toDateString()
          }}</span>
          <div
            v-html="post.state.propertyDetail[0]?.propertyHTML"
            class="mt-8 blogHTML"
          ></div>
        </section>
      </div>
    </div>

    <div class="w-full lg:h-[30rem] h-[23rem] mt-8">
      <div ref="mapContainer" style="width: 100%; height: 100%"></div>
    </div>
  </main>
</template>
