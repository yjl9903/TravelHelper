<template>
  <v-container class="home">
    <v-row dense v-if="plan">
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card :day="i + 1" :source="item"></day-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex';
import DayCard from '@/components/daycard.vue';

export default {
  name: 'home',
  components: {
    DayCard
  },
  data: () => ({
    plan: null
  }),
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
