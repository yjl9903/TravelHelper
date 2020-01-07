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
        <span>{{ fday | date(false) }}</span>
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
      </v-card-title>

      <v-list v-if="source.length > 0" two-line>
        <v-list-item v-for="(item, i) in source" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              <span
                >{{ item.begin | hourMinute }} ~
                {{ item.end | hourMinute }}</span
              >
              <span class="title"> {{ item.location }}</span>
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
export default {
  name: 'dayCard',
  props: {
    day: Number,
    source: Array,
    base: Date,
    isEdit: Boolean
  },
  data: () => ({}),
  computed: {
    fday() {
      return new Date(this.base.getTime() + this.day * 24 * 60 * 60 * 1000);
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
    getDistance() {
      return '20 公里';
    }
  }
};
</script>

<style></style>
