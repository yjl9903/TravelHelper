import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '../store';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '我的计划'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '关于'
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
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
    component: () => import('../views/PlanDetail.vue'),
    props: true
  },
  {
    path: '/plan/:id/edit/:day',
    component: () => import('../views/EditDay.vue'),
    props: true
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
