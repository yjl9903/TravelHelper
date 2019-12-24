<template>
  <div>
    <v-list>
      <v-list-item
        two-line
        v-for="item in plans"
        :key="item.name"
        @click="() => {}"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.date.begin | date }} ~ {{ item.date.end | date }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-btn fab class="fix-btn" dark color="green">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "plan",
  data: () => ({}),
  computed: {
    ...mapState({
      plans: "plans"
    })
  }
};
</script>

<style>
.fix-btn {
  position: fixed;
  right: 20px;
  bottom: 80px;
}
</style>
