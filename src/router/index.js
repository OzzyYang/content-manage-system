import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView";
import allUserManageCom from "@/components/home/ManageAllUser.vue";
import allBookMangeCom from "@/components/home/ManageAllBook.vue";

import userManageCom from "@/components/home/ManageUser.vue";

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
      { path: "um/user/:action", component: userManageCom }
    ]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
