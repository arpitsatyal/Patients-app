import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import CreatePatient from '../pages/CreatePatient.vue';

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-patient",
    name: "CreatePatient",
    component: CreatePatient,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function canUserAccess() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.accessToken ? true : false;
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // Check for protected route
  if (requiresAuth && !canUserAccess()) {
    next("");
  } else {
    next();
  }
});

export default router;
