<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span>出行小助手</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation grow app>
      <v-btn to="plan">
        <span>出行规划</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/">
        <span>日程表</span>
        <v-icon>event_note</v-icon>
      </v-btn>

      <v-btn to="settings">
        <span>设置</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
