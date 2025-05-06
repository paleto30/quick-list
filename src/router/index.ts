import {
  createRouter,
  createMemoryHistory,
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
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
