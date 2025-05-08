import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  // register routes here
  {
    path: "/",
    redirect: "/sign-in",
  },
  {
    path: "/sign-in",
    component: () => import("../sign-in/view/LoginView.vue"),
  },
  {
    path: "/sign-up",
    component: () => import("../sign-up/view/RegisterView.vue"),
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("../groups/view/GroupsView.vue"),
  },
  // {
  //   path: "/nav",
  //   component: () => import("../common/navbar/NavBar.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
