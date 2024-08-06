/*
Name: Jensen Stamp
Description: This is used to define all the paths in the project
Date: 2/8/24
*/

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/register", component: () => import("../views/Register.vue") },
  { path: "/settings", component: () => import("../views/Settings.vue") },
  { path: "/tasks", component: () => import("../views/Tasks.vue") },
  { path: "/assigned", component: () => import("../views/Assigned.vue") },
  { path: "/upcoming", component: () => import("../views/Upcoming.vue") },
  { path: "/history", component: () => import("../views/TaskHistory.vue") },
  { path: "/classes", component: () => import("../views/Classes.vue") }
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
