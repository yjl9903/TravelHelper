<template>
  <v-bottom-sheet v-model="show" hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn fab class="fix-btn" dark color="green" v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-sheet class="text-center">
      <v-container>
        <!-- <v-btn
          class="my-6"
          depressed
          color="error"
          @click="show = !show"
        >关闭</v-btn> -->
        <div class="title">新的行程计划</div>

        <v-text-field
          v-model="plan.name"
          label="计划名称"
          required
        ></v-text-field>

        <v-menu
          v-model="beginMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              readonly
              v-model="plan.begin"
              label="开始日期"
            ></v-text-field>
          </template>
          <v-date-picker
            color="red lighten-1"
            locale="zh-cn"
            v-model="plan.begin"
            @input="beginMenu = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="endMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              readonly
              v-model="plan.end"
              label="结束日期"
            ></v-text-field>
          </template>
          <v-date-picker
            color="red lighten-1"
            locale="zh-cn"
            v-model="plan.end"
            @input="endMenu = false"
          ></v-date-picker>
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
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default {
  name: '',
  data: () => ({
    show: false,
    beginMenu: false,
    endMenu: false,
    plan: {
      name: null,
      begin: today,
      end: today
    },
    alert: {
      show: false,
      text: ''
    }
  }),
  methods: {
    submit() {
      this.alert.show = false;
      const form = {
        name: this.plan.name || '新的计划',
        day: [],
        date: {
          begin: new Date(this.plan.begin + ' 0:0'),
          end: new Date(this.plan.end + ' 23:59')
        }
      };
      if (form.date.begin > form.date.end) {
        this.alert.text = '开始日期必须在结束日期之前';
        this.alert.show = true;
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
      }
      try {
        this.$store.commit('addPlan', form);
        this.show = false;
      } catch (error) {
        this.alert.text = '与已有计划重叠';
        this.alert.show = true;
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
      }
    }
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
