import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { firestore, storage } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const usePost = defineStore("post", () => {
  const state = ref({
    loading: false,
    error: "",
    success: "",
    data: [] as {}[] | any[],
    propertyDetail: [] as any,
  });

  const CREATE = async (payload: any) => {
    try {
      state.value.loading = true;

      const imageRef = firebaseRef(
        storage,
        `documents/cover_photo/${payload.propertyPhotoName}`
      );

      const uploadTask = uploadBytesResumable(imageRef, payload.propertyPhoto);
      await uploadTask;
      const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

      addDoc(collection(firestore, "posts"), {
        property: payload.property,
        propertyTitle: payload.propertyTitle,
        price: payload.price,
        longitude: payload.longitude,
        latitude: payload.latitude,
        propertyHTML: payload.propertyHTML,
        propertyPhotoName: payload.propertyPhotoName,
        photoURL: imageURL,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      state.value.loading = false;
      state.value.success = "Post created successfully!";
    } catch (error: string | any) {
      state.value.loading = false;
      state.value.error = "An error occured";
      console.log(error);
    }
  };

  const GETPOST = async () => {
    const colRef = collection(firestore, "posts");

    const q = query(colRef, orderBy("createdAt", "desc"));

    try {
      state.value.loading = true;
      const result = await getDocs(q);

      if (result.empty) {
        state.value.loading = false;
      } else {
        result.docs.forEach((doc) => {
          state.value.data.push({ ...doc.data(), id: doc.id });
          state.value.loading = false;
        });
      }
    } catch (error: string | any) {
      state.value.loading = false;
      state.value.error = "An error occured";
      console.log(error);
    }
  };

  const GETFOURPOSTONLY = computed(() => {
    return state.value.data.slice(0, 4);
  });

  const GETPROPERTYPOST = async (payload: string | string[] | any) => {
    state.value.loading = true;
    const docRef = doc(firestore, "posts", payload);

    try {
      const result = await getDoc(docRef);

      if (result.exists()) {
        state.value.propertyDetail.push({ ...result.data(), id: result.id });
        state.value.loading = false;
      } else {
        state.value.loading = false;
        state.value.error = "An error occured";
      }
    } catch (error: string | any) {
      state.value.loading = false;
      state.value.error = "An error occured";
      console.log(error);
    }
  };

  const DELETEPOST = async (payload: string | any) => {
    try {
      state.value.loading = true;
      if (payload.photo) {
        const storageRef = firebaseRef(
          storage,
          `documents/cover_photo/${payload.photo}`
        );
        deleteObject(storageRef)
          .then(() => {
            // File deleted successfully
            const docRef = doc(firestore, "posts", payload.id);
            deleteDoc(docRef)
              .then(() => {
                state.value.loading = false;
                state.value.success = "Post successfully deleted!";
              })
              .catch(() => {
                state.value.loading = false;
                state.value.error = "An error occured";
              });
          })
          .catch((error: string | any) => {
            state.value.loading = false;
            state.value.error = "An error occured";
            console.log(error);
          });
      } else {
        const docRef = doc(firestore, "posts", payload.id);

        deleteDoc(docRef)
          .then(() => {
            state.value.loading = false;
            state.value.error = "An error occured";
          })
          .catch((error: string | any) => {
            state.value.loading = false;
            state.value.error = "An error occured";
            console.log(error);
          });
      }
    } catch (error: string | any) {
      state.value.loading = false;
      state.value.error = "An error occured";
      console.log(error);
    }
  };

  const UPDATEPOST = async (payload: any) => {
    state.value.loading = true;
    try {
      if (payload.propertyPhoto) {
        if (state.value.propertyDetail[0]?.propertyPhotoName.length === 0) {
          const imageRef = firebaseRef(
            storage,
            `documents/cover_photo/${payload.propertyPhotoName}`
          );

          const uploadTask = uploadBytesResumable(
            imageRef,
            payload.propertyPhoto
          );
          await uploadTask;
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

          const docRef = doc(
            firestore,
            "posts",
            state.value.propertyDetail[0]?.id
          );

          updateDoc(docRef, {
            propertyTitle: payload.propertyTitle,
            price: payload.price,
            longitude: payload.longitude,
            latitude: payload.latitude,
            propertyHTML: payload.propertyHTML,
            propertyPhotoName: payload.propertyPhotoName,
            photoURL: imageURL,
            updatedAt: Date.now(),
          });

          state.value.loading = false;
          state.value.success = "Post updated successfully!";
        } else {
          const storageRef = firebaseRef(
            storage,
            `documents/cover_photo/${state.value.propertyDetail[0]?.propertyPhotoName}`
          );
          deleteObject(storageRef)
            .then(async () => {
              // File deleted successfully
              const imageRef = firebaseRef(
                storage,
                `documents/cover_photo/${payload.propertyPhotoName}`
              );

              const uploadTask = uploadBytesResumable(
                imageRef,
                payload.propertyPhoto
              );
              await uploadTask;
              const imageURL = await getDownloadURL(uploadTask.snapshot.ref);

              const docRef = doc(
                firestore,
                "posts",
                state.value.propertyDetail[0]?.id
              );

              updateDoc(docRef, {
                propertyTitle: payload.propertyTitle,
                price: payload.price,
                longitude: payload.longitude,
                latitude: payload.latitude,
                propertyHTML: payload.propertyHTML,
                propertyPhotoName: payload.propertyPhotoName,
                photoURL: imageURL,
                updatedAt: Date.now(),
              });

              state.value.loading = false;
              state.value.success = "Post updated successfully!";
            })
            .catch((error: string | any) => {
              state.value.loading = false;
              state.value.error = "An error occured";
              console.log(error);
            });
        }
      } else {
        const docRef = doc(
          firestore,
          "posts",
          state.value.propertyDetail[0]?.id
        );
        updateDoc(docRef, {
          propertyTitle: payload.propertyTitle,
          price: payload.price,
          longitude: payload.longitude,
          latitude: payload.latitude,
          propertyHTML: payload.propertyHTML,
          updatedAt: Date.now(),
        })
          .then(() => {
            state.value.loading = false;
            state.value.success = "Post updated successfully!";
          })
          .catch((error: string | any) => {
            state.value.loading = false;
            state.value.error = "An error occured";
            console.log(error);
          });
      }
    } catch (error: string | any) {
      console.log(error);
    }
  };

  const CLOSEMODAL = () => {
    state.value.error = "";
  };

  return {
    state,
    CREATE,
    GETPOST,
    GETFOURPOSTONLY,
    GETPROPERTYPOST,
    DELETEPOST,
    CLOSEMODAL,
    UPDATEPOST,
  };
});
