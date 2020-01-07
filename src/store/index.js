import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plans: [
      {
        name: '南京二日游',
        day: [
          [
            {
              location: '总统府',
              begin: new Date('2020/1/6 8:30'),
              end: new Date('2020/1/6 11:00')
            },
            {
              location: '明故宫',
              begin: new Date('2020/1/6 12:00'),
              end: new Date('2020/1/6 16:00')
            }
          ],
          [
            {
              location: '明故宫',
              begin: new Date('2020/1/7 8:30'),
              end: new Date('2020/1/7 11:00')
            },
            {
              location: '总统府',
              begin: new Date('2020/1/7 12:00'),
              end: new Date('2020/1/7 16:00')
            }
          ]
        ],
        begin: new Date('2020/1/6')
      }
    ],
    selected: {
      name: '',
      day: [],
      begin: null
    },
    title: '出行小助手'
  },
  mutations: {
    clear(state) {
      state.plans = [];
      state.selected = null;
    },
    setSelected(state) {
      const date = new Date();
      state.selected = null;
      for (const p of state.plans) {
        const l = new Date(p.begin),
          r = new Date(l.getTime() + p.day.length * 24 * 60 * 60 * 1000 - 1);
        if (l <= date && date <= r) {
          state.selected = p;
          break;
        }
      }
    },
    select(state, i) {
      if (i < state.plans.length) {
        state.selected = state.plans[i];
      }
    },
    addPlan(state, plan) {
      const st = plan.begin,
        ed = new Date(st.getTime() + plan.day.length * 24 * 60 * 60 * 1000 - 1);
      for (const { begin, day } of state.plans) {
        const l = new Date(begin),
          r = new Date(l.getTime() + day.length * 24 * 60 * 60 * 1000 - 1);
        if (Math.max(l, st) <= Math.min(r, ed)) {
          throw new Error('overlap');
        }
      }
      state.plans.push(plan);
      state.plans.sort((a, b) => {
        if (a.begin < b.begin) {
          return 1;
        } else if (a.begin > b.begin) {
          return -1;
        }
        return 0;
      });
    },
    editPlan(state, { id, plan }) {
      plan = {
        ...state.plans[id],
        ...plan
      };
      state.plans.splice(id, 1);
      const st = plan.begin,
        ed = new Date(st.getTime() + plan.day.length * 24 * 60 * 60 * 1000 - 1);
      for (const { begin, day } of state.plans) {
        const l = new Date(begin),
          r = new Date(l.getTime() + day.length * 24 * 60 * 60 * 1000 - 1);
        if (Math.max(l, st) <= Math.min(r, ed)) {
          throw new Error('overlap');
        }
      }
      state.plans.push(plan);
      state.plans.sort((a, b) => {
        if (a.begin < b.begin) {
          return 1;
        } else if (a.begin > b.begin) {
          return -1;
        }
        return 0;
      });
    },
    setTitle(state, s) {
      state.title = s || '出行小助手';
    }
  },
  actions: {},
  modules: {},
  plugins: [
    // createPersistedState()
  ]
});
