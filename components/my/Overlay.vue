// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <v-overlay v-model="overlay" class="align-center justify-center" :close-on-back="false" :persistent="true">
    <v-progress-circular size="64" indeterminate color="primary"/>
  </v-overlay>
</template>

<script>
export default defineComponent({
  layout: false,
  name: "Overlay"
});
</script>

<script setup>
import {useTasks} from "~/composables";

let tasks = useTasks();

let overlay = computed(() => tasks.value !== 0);
</script>
