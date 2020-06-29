import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/brar/',
  scrollBehavior: function (to, from, savedPosition) {
    if (to.name === from.name) {

    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./views/Homepage.vue')
    },
    {
      path: '/custom',
      name: 'custom',
      component: () => import('./views/Scheme/Custom.vue')
    },
    {
      path: '/schemes',
      name: 'schemes',
      component: () => import('./views/Scheme/Schemes.vue')
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import('./views/Subject/Subjects.vue')
    },
  ]
});