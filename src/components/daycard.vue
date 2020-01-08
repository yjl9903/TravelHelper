<template>
  <v-card>
    <div>
      <v-card-title class="headline" style="justifyContent: space-between">
        <span>{{ base.add(day, 'day').format('M 月 D 日') }}</span>
        <div>
          <v-btn v-if="isEdit" fab small icon @click="editDay">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            v-if="isEdit"
            fab
            small
            icon
            dark
            color="error"
            @click="deleteDay"
          >
            <v-icon dark>delete</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-list class="pt-0" v-if="source.length > 0">
        <v-list-item v-for="(item, i) in source" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <span
                >{{ item.begin | hourMinute }} ~
                {{ item.end | hourMinute }}</span
              >
            </v-list-item-title>
            <v-list-item-subtitle style="display: flex; align-item: center;">
              <span class="title black--text"> {{ item.name }}</span>
              <v-chip v-if="!item.position" color="warning" class="ml-3"
                >暂无位置信息</v-chip
              >
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{ i === 0 ? '距离出发地' : '距离上一地点' }} {{ getDistance(i) }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>near_me</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'dayCard',
  props: {
    day: Number,
    source: Array,
    base: dayjs,
    isEdit: Boolean
  },
  data: () => ({}),
  methods: {
    deleteDay() {
      try {
        this.$store.commit('editPlanPopDay', {
          id: this.$route.params.id,
          day: this.day
        });
      } catch (error) {
        this.$parent.openSnackBar('不能删除唯一一天');
      }
    },
    editDay() {
      this.$router.push(`/plan/${this.$route.params.id}/edit/${this.day}`);
    },
    getDistance() {
      return '20 公里';
    }
  }
};
</script>

<style></style>
