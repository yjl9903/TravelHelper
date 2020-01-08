<template>
  <v-bottom-sheet v-model="show" hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn block rounded class="mt-2" color="primary" v-on="on" @click="init"
        >新的日程</v-btn
      >
    </template>
    <v-sheet class="text-center">
      <v-container>
        <div v-if="!isEdit" class="title">新的日程计划</div>
        <div v-else class="title">编辑日程计划</div>

        <v-text-field
          v-model="plan.name"
          label="目的地"
          required
        ></v-text-field>

        <v-menu
          ref="beginMenu"
          v-model="beginMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="plan.begin"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="plan.begin"
              label="开始时间"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="beginMenu"
            v-model="plan.begin"
            @click:minute="$refs.beginMenu.save(plan.begin)"
          ></v-time-picker>
        </v-menu>

        <v-menu
          ref="endMenu"
          v-model="endMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="plan.end"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="plan.end"
              label="结束时间"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="endMenu"
            v-model="plan.end"
            @click:minute="$refs.endMenu.save(plan.end)"
          ></v-time-picker>
        </v-menu>

        <v-btn color="primary" @click="submit">确定</v-btn>

        <v-alert class="text-left mt-3" v-show="alert.show" type="error">{{
          alert.text
        }}</v-alert>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
// import dayjs from '../plugins/dayjs';

export default {
  name: 'add-plan',
  props: {
    id: Number,
    day: Number
  },
  data: () => ({
    isEdit: false,
    show: false,
    beginMenu: false,
    endMenu: false,
    plan: {
      name: null,
      begin: null,
      end: null
    },
    alert: {
      show: false,
      text: ''
    },
    pid: null
  }),
  methods: {
    init() {
      this.isEdit = false;
      this.plan.name = '';
      this.plan.begin = null;
      this.plan.end = null;
    },
    showAlert(text) {
      this.alert.text = text;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, 10000);
    },
    submit() {
      this.alert.show = false;
      const form = {
        name: this.plan.name || '目的地',
        begin: this.plan.begin,
        end: this.plan.end
      };
      try {
        if (!this.isEdit) {
          this.$store.commit('editPlanPushDayPlan', {
            id: this.id,
            day: this.day,
            plan: form
          });
          this.show = false;
          this.$parent.selPos(
            this.$store.getters.getPlanDayID(this.id, this.day, form)
          );
        } else {
          this.$store.commit('editPlanEditDayPlan', {
            id: this.id,
            day: this.day,
            pid: this.pid,
            plan: form
          });
          this.show = false;
          this.isEdit = false;
        }
      } catch (err) {
        if (err.message[err.message.length - 1] === '！') {
          this.showAlert(err.message);
        }
      }
    },
    openEdit(pid, name, begin, end) {
      this.pid = pid;
      this.plan.name = name;
      this.plan.begin = begin.format('HH:mm');
      this.plan.end = end.format('HH:mm');
      this.isEdit = true;
      this.show = true;
    }
  }
};
</script>
