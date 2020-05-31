import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./views/Homepage.vue')
    },
    {
      path: '/type1',
      name: 'type1',
      component: () => import('./views/Scheme/Type1.vue')
    },
    {
      path: '/trials',
      name: 'trials',
      component: () => import('./views/Trial/Trials.vue')
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import('./views/Subject/Subjects.vue')
    },
  ]
});