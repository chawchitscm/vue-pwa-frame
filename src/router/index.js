import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import PostList from "../pages/post/PostList";
import PostCreate from "../pages/post/PostCreate";
import PostUpdate from "../pages/post/PostUpdate";
import PostDetail from "../pages/post/PostDetail";
import Profile from "../pages/user/Profile";
import UserUpdate from "../pages/user/UserUpdate";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/post/list",
    name: "post-list",
    component: PostList,
  },
  {
    path: "/create/post",
    name: "post-create",
    component: PostCreate,
  },
  {
    path: "/update/post/:postId",
    name: "post-update",
    component: PostUpdate,
  },
  {
    path: "/post/:postId",
    name: "post-detail",
    component: PostDetail,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/update/user/:userId",
    name: "user-update",
    component: UserUpdate,
  },
  {
    path: "/*",
    redirect: "/post/list",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn;
  if (!loggedIn && to.name != "login") {
    return next("/login");
  }
  next();
});

export default router;
