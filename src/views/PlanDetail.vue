<template>
  <v-container class="home">
    <v-row dense v-if="plan">
      <v-col cols="12">
        <v-banner>
          <p>开始日期：{{ plan.begin | date }}</p>
          <p :class="[plan.beginPos ? undefined : 'mb-0']">
            行程天数：{{ plan.day.length }} 天
          </p>
          <p v-if="plan.beginPos" class="mb-0">
            出发地点：{{ plan.beginPos | formatPos }}
          </p>
          <template v-slot:actions>
            <select-pos
              btnText="选择出发地点"
              @confirm="onPosConfirm"
            ></select-pos>
            <v-btn @click="edit">编辑</v-btn>
          </template>
        </v-banner>
      </v-col>
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card
          :base="plan.begin"
          :day="i"
          :source="item"
          :isEdit="true"
        ></day-card>
      </v-col>
      <v-col cols="12" ref="addDayBtn">
        <v-btn block rounded color="primary" @click="addDay">新的一天</v-btn>
      </v-col>
    </v-row>

    <v-snackbar
      color="error"
      class="text-center subtitle"
      v-model="snackbar.show"
      :timeout="5000"
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">
        关闭
      </v-btn>
    </v-snackbar>
    <add-plan v-if="plan" ref="addplan" :isEdit="true"></add-plan>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex';
import AddPlan from '@/components/addplan.vue';
import SelectPos from '@/components/selectPos.vue';
import DayCard from '@/components/daycard.vue';

const fDate = date => {
  date = new Date(date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}/${m}/${d}`;
};

export default {
  name: 'home',
  components: {
    DayCard,
    AddPlan,
    SelectPos
  },
  props: {
    id: String
  },
  data: () => ({
    plan: null,
    snackbar: {
      show: false,
      text: ''
    }
  }),
  methods: {
    openSnackBar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },
    addDay() {
      this.$store.commit('editPlanPushDay', { id: this.id });
      this.$vuetify.goTo(this.$refs.addDayBtn);
    },
    edit() {
      this.$refs.addplan.plan.name = this.plan.name;
      this.$refs.addplan.plan.begin = fDate(this.plan.begin);
      this.$refs.addplan.plan.day = this.plan.day.length;
      this.$refs.addplan.show = true;
    },
    refresh() {
      this.plan = this.$store.state.plans[this.id];
      this.$store.commit('setTitle', this.plan.name);
    },
    onPosConfirm(obj) {
      this.$store.commit('editPlan', { id: this.id, plan: { beginPos: obj } });
      this.refresh();
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
