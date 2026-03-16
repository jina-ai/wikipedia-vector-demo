import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'vibesearch',
        path: '/vibe-search-demo',
        component: () => import('pages/VibeSearch.vue'),
      },
      {
        name: 'Wikipedia Vector Search',
        path: '',
        component: () => import('pages/VibeSearch.vue'),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
