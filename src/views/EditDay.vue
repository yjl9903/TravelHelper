<template>
  <v-container>
    <v-list v-if="dayplan" three-line>
      <v-subheader class="headline black--text">{{
        titleDay.format('M 月 D 日')
      }}</v-subheader>

      <template v-for="(item, i) in dayplan">
        <v-divider :key="'divider_' + i"></v-divider>
        <v-list-item :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <span
                >{{ item.begin | hourMinute }} ~
                {{ item.end | hourMinute }}</span
              >
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="title black--text"> {{ item.name }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ i === 0 ? '距离出发地' : '距离上一地点' }} {{ 20 }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>map</v-icon>
            </v-btn>
            <v-btn icon @click="editPos(i)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="delPos(i)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
    <add-day ref="addDay" :id="Number(id)" :day="Number(day)"></add-day>
  </v-container>
</template>

<script>
import AddDay from '@/components/addDay.vue';

export default {
  name: 'edit-day',
  components: {
    AddDay
  },
  props: {
    id: String,
    day: String
  },
  computed: {
    titleDay() {
      return this.plan.begin.add(Number(this.day), 'day');
    }
  },
  data: () => ({
    plan: null,
    dayplan: null
  }),
  methods: {
    delPos(pid) {
      this.$store.commit('editPlanPopDayPlan', {
        id: this.id,
        day: this.day,
        pid
      });
    },
    editPos(pid) {
      this.$refs.addDay.openEdit(
        pid,
        this.dayplan[pid].name,
        this.dayplan[pid].begin,
        this.dayplan[pid].end
      );
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      try {
        vm.plan = vm.$store.state.plans[to.params.id];
        vm.dayplan = vm.$store.state.plans[to.params.id].day[to.params.day];
        vm.$store.commit('setTitle', vm.plan.name);
      } catch (error) {
        vm.$router.push('/');
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    try {
      this.plan = this.$store.state.plans[to.params.id];
      this.dayplan = this.$store.state.plans[to.params.id].day[to.params.day];
      this.$store.commit('setTitle', this.plan.name);
      next();
    } catch (error) {
      next('/');
    }
  }
};
</script>

<style></style>
