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
            {{ item.begin | date }} ~
            {{ item.begin | endDate(item.day.length) | date }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <p v-if="plans.length === 0" class="text-center">尚未创建行程</p>

    <add-plan></add-plan>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddPlan from '@/components/addplan.vue';

export default {
  name: 'plan',
  components: {
    AddPlan
  },
  data: () => ({}),
  computed: {
    ...mapState({
      plans: 'plans'
    })
  },
  methods: {
    handleClick(i) {
      this.$router.push(`/plan/${i}`);
    }
  }
};
</script>

<style></style>
