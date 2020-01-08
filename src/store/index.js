import Vue from 'vue';
import Vuex from 'vuex';
import dayjs from '../plugins/dayjs';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

function cmpDate(a, b) {
  if (a.begin.isBefore(b.begin)) {
    return 1;
  } else if (a.begin.isAfter(b.begin)) {
    return -1;
  }
  return 0;
}
function cmpTime(a, b) {
  if (a.begin.isBefore(b.begin)) {
    return -1;
  } else if (a.begin.isAfter(b.begin)) {
    return 1;
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
              name: '总统府',
              begin: new Date('2020/1/6 8:30'),
              end: new Date('2020/1/6 11:00')
            },
            {
              name: '明故宫',
              begin: new Date('2020/1/6 12:00'),
              end: new Date('2020/1/6 16:00')
            }
          ],
          [
            {
              name: '明故宫',
              begin: new Date('2020/1/7 8:30'),
              end: new Date('2020/1/7 11:00')
            },
            {
              name: '总统府',
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
      let c = 0;
      for (const p of state.plans) {
        if (
          !p.begin.isAfter(date) &&
          !date.isAfter(p.begin.addDay(p.day.length))
        ) {
          state.selected = p;
          state.selected.id = c;
          break;
        }
        c++;
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
      state.plans.sort(cmpDate);
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
      id = Number(id);
      let c = 0;
      const st = dayjs(state.plans[id].begin);
      const ed = st.addDay(state.plans[id].day.length + 1);
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
      state.plans[id].day.push([]);
    },
    editPlanPopDay(state, { id, day }) {
      if (state.plans[id].day.length === 1) {
        throw new Error('can not delete first day');
      }
      state.plans[id].day.splice(day, 1);
    },
    editPlanPushDayPlan(state, { id, day, plan }) {
      if (!plan.begin) {
        throw new Error('开始时间不能为空！');
      } else if (!plan.end) {
        throw new Error('结束时间不能为空！');
      }
      const dayplan = state.plans[id].day[day];
      const time = dayjs(state.plans[id].begin).add(day, 'day');
      const st = time
        .hour(Number(plan.begin.substr(0, 2)))
        .minute(Number(plan.begin.substr(3, 2)));
      const ed = time
        .hour(Number(plan.end.substr(0, 2)))
        .minute(Number(plan.end.substr(3, 2)));
      if (st.isAfter(ed)) {
        throw new Error('开始时间不能晚于结束时间！');
      }
      for (const p of dayplan) {
        const l = time.hour(p.begin.hour()).minute(p.begin.minute());
        const r = time.hour(p.end.hour()).minute(p.end.minute());
        if (!dayjs.max(l, st).isAfter(dayjs.min(r, ed))) {
          throw new Error('与已有时间安排重叠！');
        }
        p.begin = l;
        p.end = r;
      }
      plan.begin = st;
      plan.end = ed;
      state.plans[id].day[day].push(plan);
      state.plans[id].day[day].sort(cmpTime);
    },
    editPlanEditDayPlan(state, { id, day, pid, plan }) {
      plan = {
        ...state.plans[id].day[day][pid],
        ...plan
      };
      pid = Number(pid);
      if (!plan.begin) {
        throw new Error('开始时间不能为空！');
      } else if (!plan.end) {
        throw new Error('结束时间不能为空！');
      }
      const dayplan = state.plans[id].day[day];
      const time = dayjs(state.plans[id].begin).add(day, 'day');
      const st = time
        .hour(Number(plan.begin.substr(0, 2)))
        .minute(Number(plan.begin.substr(3, 2)));
      const ed = time
        .hour(Number(plan.end.substr(0, 2)))
        .minute(Number(plan.end.substr(3, 2)));
      if (st.isAfter(ed)) {
        throw new Error('开始时间不能晚于结束时间！');
      }
      let c = 0;
      for (const p of dayplan) {
        if (pid === c) continue;
        const l = time.hour(p.begin.hour()).minute(p.begin.minute());
        const r = time.hour(p.end.hour()).minute(p.end.minute());
        if (!dayjs.max(l, st).isAfter(dayjs.min(r, ed))) {
          throw new Error('与已有时间安排重叠！');
        }
        p.begin = l;
        p.end = r;
        c++;
      }
      plan.begin = st;
      plan.end = ed;
      state.plans[id].day[day][pid] = plan;
      state.plans[id].day[day].sort(cmpTime);
    },
    editPlanPopDayPlan(state, { id, day, pid }) {
      state.plans[id].day[day].splice(pid, 1);
    },
    setTitle(state, s) {
      state.title = s || '出行小助手';
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
});
