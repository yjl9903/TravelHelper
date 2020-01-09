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
            <v-btn
              @click="
                plan.star
                  ? $store.commit('delStar', id)
                  : $store.commit('addStar', id),
                  $store.commit('sortPlan'),
                  refresh(true)
              "
              >{{ plan.star ? '取消置顶' : '设为置顶' }}</v-btn
            >
            <v-btn @click="selBeginPos">选择出发地点</v-btn>
            <v-btn @click="edit">编辑</v-btn>
          </template>
        </v-banner>
      </v-col>
      <v-col v-for="(item, i) in plan.day" :key="i" cols="12">
        <day-card
          :begPos="plan.beginPos"
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

    <select-pos
      ref="selectPos"
      :hideBtn="true"
      @confirm="onPosConfirm"
    ></select-pos>

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
  return `${y}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
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
      try {
        this.$store.commit('editPlanPushDay', { id: this.id });
        this.$vuetify.goTo(this.$refs.addDayBtn);
      } catch (err) {
        this.openSnackBar('与已有计划重叠');
      }
    },
    edit() {
      this.snackbar.show = false;
      this.$refs.addplan.plan.name = this.plan.name;
      this.$refs.addplan.plan.begin = fDate(this.plan.begin);
      this.$refs.addplan.plan.day = this.plan.day.length;
      this.$refs.addplan.show = true;
    },
    refresh(flag) {
      this.snackbar.show = false;
      if (flag) {
        const id = this.$store.getters.getPlanID(this.plan);
        if (Number(this.id) !== id) {
          this.$router.replace(`/plan/${id}`);
        }
      } else {
        this.plan = this.$store.state.plans[this.id];
        this.$store.commit('setTitle', this.plan.name);
      }
    },
    selBeginPos() {
      if (this.plan.beginPos) {
        this.$refs.selectPos.open(this.plan.beginPos.lnglat);
      } else {
        this.$refs.selectPos.open();
      }
    },
    onPosConfirm(obj) {
      this.$store.commit('editPlan', { id: this.id, plan: { beginPos: obj } });
      this.refresh();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      try {
        vm.$vuetify.goTo(vm);
        vm.plan = vm.$store.state.plans[to.params.id];
        vm.$store.commit('setTitle', vm.plan.name);
      } catch (error) {
        vm.$router.push('/');
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    try {
      this.$vuetify.goTo(this);
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
