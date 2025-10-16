import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "../common/stores/authStore";
import { useUserStore } from "../common/stores/userStore";

const routes: RouteRecordRaw[] = [
  // register routes here
  {
    path: "/sign-in",
    name: "login",
    component: () => import("../sign-in/view/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: "Register",
    component: () => import("../sign-up/view/RegisterView.vue"),
  },
  {
    path: "/",
    name: "App",
    component: () => import("../common/layouts/AppContainer.vue"),
    children: [
      {
        path: "",
        redirect: { name: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../prueba/Dashboard.vue"),
      },
      {
        path: "groups",
        name: "groups",
        component: () => import("../prueba/Groups.vue"),
      },
    ],
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("../common/view/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, _from, next) => {
//   const authStore = useAuthStore();
//   const userStore = useUserStore();

//   const isAuthenticated = !!authStore.accessToken && !!userStore.user;

//   const publicRoutes = ["/sign-in", "/sign-up", "/not-found"];

//   if (!isAuthenticated && !publicRoutes.includes(to.path)) {
//     // No autenticado y tratando de acceder a ruta privada
//     next("/sign-in");
//   } else {
//     // Acceso permitido
//     next();
//   }
// });

export default router;
