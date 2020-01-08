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
          <v-list-item-title style="display: flex; align-item: center;">
            <v-icon v-if="item.star" color="yellow darken-1">star</v-icon>
            <span
              :class="[item.star ? 'ml-1' : undefined]"
              style="line-height: 24px;"
              >{{ item.name }}</span
            >
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.begin.format('YYYY 年 M 月 D 日') }} ~
            {{ item.begin.addDay(item.day.length).format('YYYY 年 M 月 D 日') }}
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
  },
  mounted() {
    this.$vuetify.goTo(this);
  }
};
</script>

<style></style>
