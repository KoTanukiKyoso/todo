// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <div class="d-inline-block">
    <v-tooltip location="bottom" :disabled="!hover">
      <template v-slot:activator="{ props }">
        <v-btn :icon="icon" v-bind="props" variant="text" color="gray" :size="small ? 'small' : ''" density="compact" @click="open=true"
               tabindex="-1"/>
      </template>
      <div>
        <my-description :text="hint" color="white"/>
      </div>
    </v-tooltip>
    <v-dialog v-model="open" :closeAction="()=>open=false">
      <template v-slot:default="{ isActive }">
        <v-card class="pb-4">
          <v-card-title v-if="title" class="d-flex text-white pa-4 pb-2 bg-accent">
            {{ title }}
          </v-card-title>
          <v-card-text style="color: #333333;">
            <my-description :text="hint" :new-line="true" :show-over="false"/>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "Hint"
});
</script>
<script setup lang="ts">
let open: Ref<boolean> = ref(false);

export interface Props {
  icon?: string,
  small?: boolean,
  title?: string,
  hint?: string,
  hover?: boolean,
}

const Props = withDefaults(defineProps<Props>(), {
  icon: "mdi-help-circle-outline",
  small: true,
  title: "ヒント",
  hint: "ヒント",
  hover: true,
});
</script>
