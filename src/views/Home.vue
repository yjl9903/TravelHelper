<template>
  <v-container class="home">
    <v-row dense v-if="plan">
      <!-- <v-col cols="12">
        <v-banner two-line transition="slide-y-transition">
          <p>开始日期：{{ plan.date.begin | date }}</p>
          <p class="mb-0">结束日期：{{ plan.date.end | date }}</p>
        </v-banner>
      </v-col> -->
      <v-col v-if="!plan.beginPos" cols="12">
        <v-alert type="warning">暂无出发地点位置信息</v-alert>
      </v-col>
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card
          :begPos="plan.beginPos"
          :base="begin"
          :day="i"
          :source="item"
        ></day-card>
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
import dayjs from 'dayjs';
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
      plan: 'selected',
      begin: ({ selected: { begin } }) => dayjs(begin)
    })
  },
  mounted() {
    this.$vuetify.goTo(this);
    this.$store.commit('setSelected');
    if (this.plan) {
      this.$store.commit('setTitle', this.plan.name);
    }
  }
};
</script>

<style></style>
