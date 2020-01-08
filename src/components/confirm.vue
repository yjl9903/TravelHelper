<template>
  <v-dialog v-model="dialog" width="300">
    <v-card>
      <v-card-title class="title" primary-title>{{ text }}</v-card-title>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="dialog = false">取消</v-btn>
        <v-btn color="error" text @click="$emit('confirm')">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'confirm-dialog',
  props: {
    text: String
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    open() {
      this.dialog = true;
    }
  }
};
</script>

<style></style>
