// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
    <v-footer :app="true" theme="dark" order="2">
        <a target="_blank" style="color: white; text-decoration: none;" href="https://top.nexsjp.com">
            N-DEV {{ new Date().getFullYear() }}
        </a>
    </v-footer>
</template>
<script lang="ts">
export default defineComponent({
  layout: true,
  name: "Footer",
});
</script>
<script setup lang="ts">

</script>
