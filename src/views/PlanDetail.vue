<template>
  <v-container class="home">
    <v-row dense v-if="plan">
      <v-col cols="12">
        <v-banner>
          <p>开始日期：{{ plan.begin | date }}</p>
          <p class="mb-0 d-inline-block">行程天数：{{ plan.day.length }} 天</p>
          <template v-slot:actions>
            <v-btn @click="edit">编辑</v-btn>
          </template>
        </v-banner>
      </v-col>
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card :base="plan.begin" :day="i" :source="item"></day-card>
      </v-col>
    </v-row>
    <add-plan v-if="plan" ref="addplan" :isEdit="true"></add-plan>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex';
import AddPlan from '@/components/addplan.vue';
import DayCard from '@/components/daycard.vue';

const fDate = date => {
  date = new Date(date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m}-${d}`;
};

export default {
  name: 'home',
  components: {
    DayCard,
    AddPlan
  },
  data: () => ({
    plan: null
  }),
  methods: {
    edit() {
      this.$refs.addplan.plan.name = this.plan.name;
      this.$refs.addplan.plan.begin = fDate(this.plan.begin);
      this.$refs.addplan.plan.day = this.plan.day.length;
      this.$refs.addplan.show = true;
    },
    refresh() {
      this.plan = this.$store.state.plans[this.$route.params.id];
      this.$store.commit('setTitle', this.plan.name);
    }
  },
  mounted() {
    if (this.plan) {
      this.$store.commit('setTitle', this.plan.name);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      try {
        vm.plan = vm.$store.state.plans[to.params.id];
        vm.$store.commit('setTitle', vm.plan.name);
      } catch (error) {
        vm.$router.push('/');
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    try {
      this.plan = this.$store.state.plans[to.params.id];
      this.$store.commit('setTitle', this.plan.name);
      next();
    } catch (error) {
      next('/');
    }
  }
};
</script>

<style></style>