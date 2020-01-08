<template>
  <v-container>
    <day-card
      v-if="plan"
      :base="plan.begin"
      :day="Number(day)"
      :source="dayplan"
    ></day-card>
  </v-container>
</template>

<script>
import DayCard from '@/components/daycard.vue';

export default {
  name: 'edit-day',
  components: {
    DayCard
  },
  props: {
    id: String,
    day: String
  },
  data: () => ({
    plan: null,
    dayplan: null
  }),
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
