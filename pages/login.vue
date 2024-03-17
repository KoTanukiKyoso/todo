// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <l-page-container max-width="700">
    <my-login-form :has-facebook="false" :has-git-hub="false" :has-google="false" to="/apps"/>
  </l-page-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>
