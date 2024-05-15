import { isLogined } from '@/guard/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard', meta: { requiresAuth: true } },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'users',
          component: () => import('../pages/users/users.vue'),
        },
        {
          path: 'posts',
          component: () => import('../pages/posts/posts.vue'),
        },
        {
          path: 'conversations',
          component: () => import('../pages/conversations/conversations.vue'),
        },
        {
          path: 'schools',
          component: () => import('../pages/schools/schools.vue'),
        },
        {
          path: 'faculty',
          component: () => import('../pages/faculty/faculty.vue'),
        },
        {
          path: 'provinces',
          component: () => import('../pages/provinces/provinces.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogined()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // Nếu route không yêu cầu xác thực, cho phép truy cập
  }
});

export default router
