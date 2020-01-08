import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from '../plugins/dayjs';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

function cmp(a, b) {
  if (a.begin.isBefore(b.begin)) {
    return 1;
  } else if (a.begin.isAfter(b.begin)) {
    return -1;
  }
  return 0;
}

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
        begin: new Date('2020/1/6'),
        beginPos: {
          addressComponent: {
            citycode: '025',
            adcode: '320102',
            businessAreas: [
              {
                name: '孝陵卫',
                id: '320102',
                location: {
                  P: 32.030621,
                  O: 118.85895299999999,
                  lng: 118.858953,
                  lat: 32.030621
                }
              }
            ],
            neighborhoodType: '',
            neighborhood: '',
            building: '',
            buildingType: '',
            street: '孝陵卫街',
            streetNumber: '200号614幢',
            province: '江苏省',
            city: '南京市',
            district: '玄武区',
            township: '孝陵卫街道'
          },
          formattedAddress:
            '江苏省南京市玄武区孝陵卫街道孝陵卫街200号614幢南京理工大学',
          lnglat: [118.857344, 32.022667]
        }
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
    formatDate(state) {
      for (const plan of state.plans) {
        plan.begin = dayjs(plan.begin);
        for (const day of plan.day) {
          for (const ev of day) {
            ev.begin = dayjs(ev.begin);
            ev.end = dayjs(ev.end);
          }
        }
      }
    },
    setSelected(state) {
      const date = dayjs();
      state.selected = null;
      for (const p of state.plans) {
        if (
          !p.begin.isAfter(date) &&
          !date.isAfter(p.begin.addDay(p.day.length))
        ) {
          state.selected = p;
          break;
        }
      }
    },
    addPlan(state, plan) {
      const st = dayjs(plan.begin);
      const ed = st.addDay(plan.day.length);
      for (const {
        begin,
        day: { length }
      } of state.plans) {
        if (
          !dayjs.max(begin, st).isAfter(dayjs.min(begin.addDay(length), ed))
        ) {
          throw new Error('overlap');
        }
      }
      plan.begin = st;
      state.plans.push(plan);
      state.plans.sort(cmp);
    },
    editPlan(state, { id, plan }) {
      id = Number(id);
      plan = {
        ...state.plans[id],
        ...plan
      };
      let c = 0;
      const st = dayjs(plan.begin);
      const ed = st.addDay(plan.day.length);
      for (const {
        begin,
        day: { length }
      } of state.plans) {
        if (id === c) continue;
        if (
          !dayjs.max(begin, st).isAfter(dayjs.min(begin.addDay(length), ed))
        ) {
          throw new Error('overlap');
        }
        c++;
      }
      plan.begin = st;
      state.plans[id] = plan;
    },
    deletePlan(state, id) {
      state.plans.splice(id, 1);
    },
    editPlanPushDay(state, { id }) {
      state.plans[id].day.push([]);
    },
    editPlanPopDay(state, { id, day }) {
      if (state.plans[id].day.length === 1) {
        throw new Error('can not delete first day');
      }
      state.plans[id].day.splice(day, 1);
    },
    setTitle(state, s) {
      state.title = s || '出行小助手';
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
