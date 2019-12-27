<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn
        icon
        v-show="
          $route.path !== '/' &&
            $route.path !== '/settings' &&
            $route.path !== '/plan'
        "
        @click="$router.go(-1)"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in menuList"
            :key="i"
            @click="item.to !== $route.path && $router.push(item.to)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation fixed grow app :value="active">
      <v-btn to="plan" style="height: inherit">
        <span>我的计划</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/" style="height: inherit">
        <span>当前行程</span>
        <v-icon>event_note</v-icon>
      </v-btn>

      <v-btn to="settings" style="height: inherit">
        <span>设置</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    active: 1,
    menuList: [
      {
        name: '批量删除',
        to: '/'
      },
      {
        name: '新的一天',
        to: '/'
      }
    ]
  }),
  computed: {
    ...mapState({
      title: 'title',
      selected: 'selected'
    })
  },
  created() {
    this.$store.commit('setSelected');
  }
};
</script>
