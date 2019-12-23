<template>
  <v-container class="home">
    <v-calendar
      style="overflow: hidden;"
      color="primary"
      type="day"
      :today="today"
      :events="events"
      :event-color="getEventColor"
      :event-name="getEventName"
      @click:date="handleDate"
      @click:time="handleClick"
      @click:event="showEvent"
    >
    </v-calendar>

    <v-bottom-sheet v-model="isShow">
      <v-sheet class="text-center" height="200px">
        <v-btn class="my-6" depressed color="error" @click="isShow = !isShow"
          >关闭</v-btn
        >
        <div class="title">切换日期</div>
      </v-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data: () => ({
    isShow: false,
    today: new Date(),
    events: [
      {
        name: "上机",
        location: "南京理工大学计算机学院",
        start: "2019-12-08 8:00",
        end: "2019-12-08 12:15",
        color: "green"
      },
      {
        name: "人机交互",
        location: "第四教学楼",
        start: "2019-12-08 14:00",
        end: "2019-12-08 15:35",
        color: "green"
      }
    ],
    start: null,
    inEv: false
  }),
  methods: {
    handleDate() {
      this.isShow = true;
    },
    handleClick(obj) {
      if (this.inEv) return false;
      if (this.start === null) {
        console.log(obj);
        const ev = {
          name: "新的事件",
          start: obj.date + " " + obj.time,
          color: "#ccc"
        };
        this.events.push(ev);
        this.start = obj;
      } else {
        const ev = this.events.pop();
        ev.end = obj.date + " " + obj.time;
        ev.color = "green";
        this.events.push(ev);
        this.start = null;
      }
    },
    showEvent() {
      this.inEv = true;
      this.isShow = true;
      setTimeout(() => (this.inEv = false), 0);
      return false;
    },
    getEventColor(ev) {
      return ev.color;
    },
    getEventName({ start, end, input: { name, location = "未知" } }) {
      const s = `<strong>${name}</strong> - ${location}</br>`;
      const a = `${start.hour < 12 ? "上午" : "下午"} ${start.time}`;
      const b = `${end.hour < 12 ? "上午" : "下午"} ${end.time}`;
      const t = `${a} 到 ${b}`;
      return s + t;
    }
  }
};
</script>

<style>
.v-calendar-daily__intervals-head {
  width: 60px !important;
}
.v-calendar-daily__intervals-body {
  width: 60px !important;
}
</style>
