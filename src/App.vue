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

      <v-toolbar-title class="pl-0">{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$route.path === '/' && selected"
        icon
        :to="`/plan/${selected.id}`"
      >
        <v-icon>edit</v-icon>
      </v-btn>

      <v-menu left bottom v-if="$route.path === '/plan'">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in menuList"
            :key="i"
            @click="item.click"
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
      <v-btn to="/plan" style="height: inherit">
        <span>我的计划</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/" style="height: inherit">
        <span>当前行程</span>
        <v-icon>event_note</v-icon>
      </v-btn>

      <v-btn to="/settings" style="height: inherit">
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
    active: 1
  }),
  computed: {
    ...mapState({
      title: 'title',
      selected: 'selected'
    }),
    menuList() {
      return [
        {
          name: '排序',
          click: () => {
            this.$store.commit('sortPlan');
          }
        },
        {
          name: '清空收藏',
          click: () => {}
        }
      ];
    }
  },
  created() {
    this.$store.commit('formatDate');
  }
};
</script>
