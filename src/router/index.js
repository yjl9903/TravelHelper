import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/plan',
    name: 'plan',
    component: () => import('../views/Plan.vue'),
    meta: {
      title: '我的计划'
    }
  },
  {
    path: '/plan/:id',
    component: () => import('../views/PlanDetail.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    Store.commit('setTitle', to.meta.title);
  }
  next();
});

export default router;
