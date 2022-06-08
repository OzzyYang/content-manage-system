import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView";
import userManageCom from "@/components/home/user-manage.vue";
import bookMangeCom from "@/components/home/book-manage.vue";
import userEditCom from "@/components/userinfo-edit.vue";

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
      { path: "um", component: userManageCom },
      { path: "bm", component: bookMangeCom },
      { path: "um/:id", component: userEditCom }
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
