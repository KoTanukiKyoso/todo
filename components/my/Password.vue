// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <v-text-field v-model.trim="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" prepend-inner-icon="mdi-key" :rules="rules"
                :type="show ? 'text' : 'password'" counter="20" @click:append="show=!show" :hide-details="false"
                :style="{'max-width': maxWidth + 40 + 'px'}" class="password"/>
</template>

<script setup lang="ts">
import {useStore} from "~/composables";

let {isSignedIn, user, title} = useStore();

let password = defineModel<string>();

export interface Props {
  showTip?: string,
  maxWidth?: number,
  rules?: any[],
}

const props = withDefaults(defineProps<Props>(),
  {
    showTip: "",
    maxWidth: 400,
    rules: () => [rules.required, rules.min(7)],
  }
);

let show = ref(false);

</script>
