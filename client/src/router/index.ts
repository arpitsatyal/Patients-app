import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import CreatePatient from '../pages/CreatePatient.vue';
import UpdatePatient from '../pages/UpdatePatient.vue';
import PatientProfile from '../pages/PatientProfile.vue';
import { canUserAccess } from "@/utils/isAuthorized";

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
  {
    path: "/edit-patient/:id",
    name: "UpdatePatient",
    component: UpdatePatient,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile/:id",
    name: "PatientProfile",
    component: PatientProfile,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

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
