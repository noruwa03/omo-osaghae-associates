import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DefaultVue from "../layouts/Default.vue";
import HomePageVue from "../pages/HomePage.vue";
import PropertyVue from "../pages/Property/Property.vue";
import AuthenticationVue from "../layouts/Authentication.vue";
import SigninPageVue from "../pages/SigninPage.vue";
import AdminVue from "../layouts/Admin.vue";
import AdminPageVue from "../pages/Admin/Admin.vue";
import CreatePageVue from "../pages/Admin/Create.vue";
import EditVue from "../pages/EditPage/Edit.vue";
import PropertyPageVue from "../pages/PropertyPage.vue";
import NotFoundPageVue from "../pages/NotFoundPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "DefaultLayout",
    path: "/",
    component: DefaultVue,
    children: [
      {
        name: "Home",
        path: "",
        component: HomePageVue,
      },
      {
        name: "PropertyListing",
        path: "/property",
        component: PropertyPageVue,
      },
      {
        name: "Property",
        path: "/property/:slug",
        component: PropertyVue,
        props: true,
      },
    ],
  },
  {
    name: "AuthenticationLayout",
    path: "/auth",
    component: AuthenticationVue,
    children: [
      {
        name: "Signin",
        path: "signin",
        component: SigninPageVue,
      },
      {
        name: "NotFound",
        path: "/:catchAll(.*)",
        component: NotFoundPageVue
      }
    ],
  },
  {
    name: "AdminLayout",
    path: "/admin",
    component: AdminVue,
    children: [
      {
        name: "Admin",
        path: "",
        component: AdminPageVue,
      },
      {
        name: "Create",
        path: "create",
        component: CreatePageVue,
      },
      {
        name: "Edit",
        path: "/edit/:slug",
        component: EditVue,
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
