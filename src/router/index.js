import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView";
import allUserManageCom from "@/components/home/ManageAllUser.vue";
import allBookMangeCom from "@/components/home/ManageAllBook.vue";
import allTagMangeCom from "@/components/home/ManageAllTag.vue";
import userManageCom from "@/components/home/ManageUser.vue";
import bookManageCom from "@/components/home/ManageBook.vue";
import tagManageCom from "@/components/home/ManageTag.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: LoginView
  },
  {
    path: "/home",
    component: HomeView,
    children: [
      { path: "", redirect: "um" },
      { path: "um", component: allUserManageCom },
      { path: "bm", component: allBookMangeCom },
      { path: "tm", component: allTagMangeCom },
      { path: "um/user/:action", component: userManageCom },
      { path: "bm/book/:action", component: bookManageCom },
      { path: "tm/tag/:action", component: tagManageCom }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
