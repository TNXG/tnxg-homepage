import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/layout/Home.vue';
import Articles from '@/layout/Articles.vue';
import Projects from '@/layout/Projects.vue';
import Social from '@/layout/Social.vue';
import Friends from '@/layout/Friends.vue';
import About from '@/layout/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/articles', component: Articles },
  { path: '/projects', component: Projects },
  { path: '/social', component: Social },
  { path: '/friends', component: Friends },
  { path: '/about', component: About },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;