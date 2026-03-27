import MainPage from '@/views/index.vue';
import SavedPage from '@/views/saved/index.vue';
import NotFound from '@/views/notFound.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: {
      title: 'Main Page',
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/saved',
    name: 'SavedPage',
    component: SavedPage,
    meta: {
      title: 'Saved Page',
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
