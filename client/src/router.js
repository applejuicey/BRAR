import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import Type1 from './views/Type1.vue'
import Home from './views/Home.vue'
import Page1 from './views/Page1.vue'
import Page2 from './views/Page2.vue'
import Page3 from './views/Page3.vue'
import Page4 from './views/Page4.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/type1',
      name: 'type1',
      component: Type1
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/2',
      name: 'page2',
      component: Page2
    },
    {
      path: '/3',
      name: 'page3',
      component: Page3
    },
    {
      path: '/4',
      name: 'page4',
      component: Page4
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
