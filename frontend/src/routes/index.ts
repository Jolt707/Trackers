import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/register", component: () => import("../views/Register.vue") },
  { path: "/settings", component: () => import("../views/Settings.vue") },
  { path: "/tasks", component: () => import("../views/Tasks.vue") },
  { path: "/assigned", component: () => import("../views/Assigned.vue") },
  { path: "/upcoming", component: () => import("../views/Upcoming.vue") }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
