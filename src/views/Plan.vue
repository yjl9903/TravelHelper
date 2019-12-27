<template>
  <div>
    <v-list>
      <v-list-item
        two-line
        v-for="(item, i) in plans"
        :key="i"
        @click="handleClick(i)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.date.begin | date }} ~ {{ item.date.end | date }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <add-plan></add-plan>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AddPlan from "@/components/addplan.vue";

export default {
  name: "plan",
  components: {
    AddPlan
  },
  data: () => ({}),
  computed: {
    ...mapState({
      plans: "plans"
    })
  },
  methods: {
    handleClick(i) {
      this.$store.commit("select", i);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
