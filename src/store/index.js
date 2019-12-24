import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plans: [
      {
        name: "南京二日游",
        day: [
          [
            {
              location: "总统府",
              begin: new Date("2019-12-23 8:30"),
              end: new Date("2019-12-23 11:00")
            },
            {
              location: "明故宫",
              begin: new Date("2019-12-23 12:00"),
              end: new Date("2019-12-23 16:00")
            }
          ],
          [
            {
              location: "明故宫",
              begin: new Date("2019-12-23 8:30"),
              end: new Date("2019-12-23 11:00")
            },
            {
              location: "总统府",
              begin: new Date("2019-12-23 12:00"),
              end: new Date("2019-12-23 16:00")
            }
          ]
        ],
        date: {
          begin: new Date("2019-12-23"),
          end: new Date("2019-12-26")
        }
      }
    ],
    selected: {
      name: "",
      day: [],
      date: {
        begin: null,
        end: null
      }
    },
    title: "出行小助手"
  },
  mutations: {
    setSelected(state) {
      const date = new Date();
      for (const p of state.plans) {
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
    addPlan() {},
    setTitle(state, s) {
      state.title = s || "出行小助手";
    }
  },
  actions: {},
  modules: {}
  // plugins: [createPersistedState()]
});
