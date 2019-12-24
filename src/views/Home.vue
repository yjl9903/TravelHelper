<template>
  <v-container class="home">
    <v-row dense>
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card :day="i + 1" :source="item"></day-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DayCard from "@/components/daycard.vue";

export default {
  name: "home",
  components: {
    DayCard
  },
  data: () => ({}),
  computed: {
    ...mapState({
      plan: "selected"
    })
  },
  mounted() {
    this.$store.commit("setTitle", this.plan.name);
  }
};
</script>

<style></style>
