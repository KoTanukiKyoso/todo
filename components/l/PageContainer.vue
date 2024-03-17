// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <div class="pa-md-4 mx-auto" :style="{maxWidth: maxWidth}">
    <v-card variant="flat" :border="border" class="mx-auto" min-height="400" :color="color">
      <slot/>
    </v-card>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "PageContainer",
});
</script>
<script setup lang="ts">
export interface Props {
  maxWidth?: string | number,
  color?: string,
  border?: boolean,
}

const Props = withDefaults(defineProps<Props>(), {
  maxWidth: "860px",
  color: "transparent",
  border: false,
});
</script>
