import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Announcement from "../views/Announcement.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[
      {
        path: "",
        name: "Announcement",
        component: Announcement,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
      {
        path: "/forum",
        name: "index",
        component: () => import('@/views/index/index.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/index.vue')
      },
      {
        path: '/add-topic',
        name: 'addTopic',
        meta: { requiredLogin: true },
        component: () => import('@/views/edit-topic/index.vue')
      },
      {
        path: '/edit-topic/:id',
        name: 'editTopic',
        meta: { requiredLogin: true },
        component: () => import('@/views/edit-topic/index.vue')
      },
      {
        path: '/message',
        name: 'message',
        meta: { requiredLogin: true },
        component: () => import('@/views/message/index.vue')
      },
      {
        path: '/collect',
        name: 'collect',
        meta: { requiredLogin: true },
        component: () => import('@/views/collect/index.vue')
      },
      {
        path: '/user/:userName',
        name: 'userDetail',
        meta: { requiredLogin: true },
        component: () => import('@/views/user-detail/index.vue')
      }
    ]
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const router = createRouter({
//   // 处理生产环境github上用的不是根目录的路由问题
//   history: createWebHashHistory(process.env.NODE_ENV === 'production' ? '/vue3-cnode' : process.env.BASE_URL),
//   routes,
// });
//
// // 路由守卫
// router.beforeEach((to, _, next) => {
//   if (to.name === 'login' && !!(store.state as { user: userStateType }).user.token) {
//     next('/');
//   } else if (to.meta.requiredLogin && !(store.state as { user: userStateType }).user.token) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// });

export default router;
