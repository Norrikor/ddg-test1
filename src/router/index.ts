import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CreateView from '@/views/CreateView.vue';
import EditView from '@/views/EditView.vue';

const router = createRouter({
  // Для GitHub Pages нужен правильный базовый путь
  history: createWebHistory('/ddg-test1/'),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/create', name: 'create', component: CreateView },
    { path: '/edit/:id', name: 'edit', component: EditView },
  ],
});

export default router;
