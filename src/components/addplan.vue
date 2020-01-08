<template>
  <v-bottom-sheet v-model="show" hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn v-if="!isEdit" fab class="fix-btn" dark color="green" v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-sheet class="text-center">
      <v-container>
        <div v-if="!isEdit" class="title">新的行程计划</div>
        <div v-else class="title">编辑行程计划</div>

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
            color="primary"
            locale="zh-cn"
            v-model="plan.begin"
            @input="beginMenu = false"
          ></v-date-picker>
        </v-menu>

        <v-text-field
          v-if="isEdit"
          label="行程天数"
          v-model="plan.day"
          type="number"
          :rules="[v => v >= 1 || '天数必须为正数']"
        ></v-text-field>

        <v-btn color="primary" @click="submit">确定</v-btn>
        <v-btn
          v-if="isEdit"
          class="ml-2"
          color="error"
          @click="$refs.confirm.open()"
          >{{ isEdit ? '删除计划' : '取消' }}</v-btn
        >
        <confirm-dialog
          v-if="isEdit"
          ref="confirm"
          text="确认删除？"
          @confirm="
            $store.commit('deletePlan', $route.params.id), $router.push('/plan')
          "
        ></confirm-dialog>

        <v-alert class="text-left mt-3" v-show="alert.show" type="error">{{
          alert.text
        }}</v-alert>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import ConfirmDialog from './confirm';

const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export default {
  name: 'add-plan',
  components: {
    ConfirmDialog
  },
  props: {
    isEdit: Boolean
  },
  data: () => ({
    show: false,
    beginMenu: false,
    plan: {
      name: null,
      begin: today,
      day: 1
    },
    alert: {
      show: false,
      text: ''
    }
  }),
  methods: {
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
        name: this.plan.name || '新的计划',
        day: new Array(Number(this.plan.day)).fill([]),
        begin: new Date(this.plan.begin + ' 00:00'),
        beginPos: null
      };
      try {
        if (this.isEdit) {
          const src = this.$store.state.plans[this.$route.params.id];
          form.day = [...src.day.slice(0, this.plan.day)];
          if (this.plan.day > src.day.length) {
            form.day = [
              ...src.day,
              ...Array(this.plan.day - src.day.length).fill([])
            ];
          }
          this.$store.commit('editPlan', {
            plan: form,
            id: this.$route.params.id
          });
          this.$parent.refresh();
        } else {
          this.$store.commit('addPlan', form);
          this.$vuetify.goTo(0);
        }
        this.plan.name = null;
        this.plan.day = 1;
        this.plan.begin = today;
        this.show = false;
      } catch (error) {
        console.log(error);
        this.showAlert('与已有计划重叠');
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
