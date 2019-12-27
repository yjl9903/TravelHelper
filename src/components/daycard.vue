<template>
  <v-card>
    <div>
      <v-card-title class="headline" style="padding-bottom: 0px;"
        >第 {{ day }} 天</v-card-title
      >

      <v-list two-line>
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
    source: Array
  },
  data: () => ({}),
  methods: {
    getDistance() {
      return '20 公里';
    }
  }
};
</script>

<style></style>
