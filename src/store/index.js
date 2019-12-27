import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
              begin: new Date('2019-12-23 8:30'),
              end: new Date('2019-12-23 11:00')
            },
            {
              location: '明故宫',
              begin: new Date('2019-12-23 12:00'),
              end: new Date('2019-12-23 16:00')
            }
          ],
          [
            {
              location: '明故宫',
              begin: new Date('2019-12-23 8:30'),
              end: new Date('2019-12-23 11:00')
            },
            {
              location: '总统府',
              begin: new Date('2019-12-23 12:00'),
              end: new Date('2019-12-23 16:00')
            }
          ]
        ],
        date: {
          begin: new Date('2019-12-23'),
          end: new Date('2019-12-26')
        }
      }
    ],
    selected: {
      name: '',
      day: [],
      date: {
        begin: null,
        end: null
      }
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
        p.date.begin = new Date(p.date.begin);
        p.date.end = new Date(p.date.end);
        if (p.date.begin <= date && date <= p.date.end) {
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
      for (const {
        date: { begin, end }
      } of state.plans) {
        if (Math.max(begin, plan.date.begin) <= Math.min(end, plan.date.end)) {
          throw new Error('overlap');
        }
      }
      state.plans.push(plan);
      state.plans.sort((a, b) => {
        if (a.date.begin < b.date.begin) {
          return 1;
        } else if (a.date.begin > b.date.begin) {
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
  plugins: [createPersistedState()]
});
