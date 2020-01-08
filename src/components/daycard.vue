<template>
  <v-card>
    <div>
      <v-card-title
        class="headline"
        :style="{
          paddingBottom: source.length > 0 ? '0px' : undefined,
          justifyContent: 'space-between'
        }"
      >
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

      <v-list v-if="source.length > 0" two-line>
        <v-list-item v-for="(item, i) in source" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <span
                >{{ item.begin | hourMinute }} ~
                {{ item.end | hourMinute }}</span
              >
              <span class="title"> {{ item.name }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ i === 0 ? '距离出发地' : '距离上一地点' }} {{ getDistance(i) }}
            </v-list-item-subtitle>
          </v-list-item-content>
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
