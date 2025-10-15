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
    path: "/",
    redirect: "/sign-in",
  },
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
    path: "/groups",
    name: "Groups",
    component: () => import("../groups/view/GroupsView.vue"),
  },
  {
    path: "/groups/:id",
    name: "GroupDetail",
    component: () => import("../groups/view/IndividualGroup.vue"),
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
  {
    path: "/test",
    name: "test",
    component: ()=> import("../prueba/GroupsV2.vue")
  }
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
