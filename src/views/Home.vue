<template>
  <v-container class="home">
    <v-row dense v-if="plan">
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card :day="i + 1" :source="item"></day-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p class="text-center">当前没有进行中的日程计划</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import DayCard from '@/components/daycard.vue';

export default {
  name: 'home',
  components: {
    DayCard
  },
  data: () => ({}),
  computed: {
    ...mapState({
      plan: 'selected'
    })
  },
  mounted() {
    if (this.plan) {
      this.$store.commit('setTitle', this.plan.name);
    }
  }
};
</script>

<style></style>
