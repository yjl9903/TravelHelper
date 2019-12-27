<template>
  <div>
    <v-list subheader>
      <v-subheader>通用</v-subheader>
      <v-list-item @click="clearStorage()">
        <v-list-item-content>
          <v-list-item-title>清除缓存</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader>关于</v-subheader>
      <v-list-item @click="$router.push('/about')">
        <v-list-item-content>
          <v-list-item-title>帮助</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="$router.push('/about')">
        <v-list-item-content>
          <v-list-item-title>关于</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="title" primary-title>确认清除缓存？</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn color="error" text @click="confirmDelete">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'settings',
  data: () => ({
    dialog: false
  }),
  methods: {
    confirmDelete() {
      this.$store.commit('clear');
      window.localStorage.removeItem('vuex');
    },
    clearStorage() {
      this.dialog = true;
    }
  }
};
</script>

<style></style>
