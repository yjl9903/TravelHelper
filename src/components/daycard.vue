<template>
  <v-card>
    <div>
      <v-card-title class="headline" style="justifyContent: space-between">
        <div class="d-flex align-center">
          <v-icon v-if="today" color="deep-orange" class="mr-1">today</v-icon>
          <span>{{ base.add(day, 'day').format('M 月 D 日') }}</span>
        </div>
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
              {{ i === 0 ? '距离出发地' : '距离上一地点' }}
              {{ getDistance(i) || '? 公里' }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              v-if="item.position"
              @click="$refs.showPos.open(item.position)"
            >
              <v-icon>near_me</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>

    <show-pos ref="showPos"></show-pos>
    <el-amap class="amap-el" vid="amapDemo"></el-amap>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import ShowPos from './showPos';
import { calDistance } from '../util';

export default {
  name: 'dayCard',
  props: {
    day: Number,
    source: Array,
    base: dayjs,
    isEdit: Boolean,
    begPos: Object
  },
  components: {
    ShowPos
  },
  data: () => ({}),
  computed: {
    today() {
      if (!this.base) return false;
      return this.base.add(this.day, 'day').isSame(dayjs(), 'day');
    }
  },
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
    getDistance(i) {
      if (!this.source[i].position) return;
      if (i === 0) {
        if (!this.begPos) return;
        const d = calDistance(
          this.begPos.lnglat,
          this.source[i].position.lnglat
        );
        return `${Number((d / 1000.0).toFixed(2))} 公里`;
      } else {
        if (!this.source[i - 1].position) return;
        const d = calDistance(
          this.source[i - 1].position.lnglat,
          this.source[i].position.lnglat
        );
        return `${Number((d / 1000.0).toFixed(2))} 公里`;
      }
    }
  }
};
</script>

<style></style>
