// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <template v-if="!text">
    <v-btn variant="text" :color="color" :size="size" :elevation="elevation" :block="block" :rounded="rounded"
           :disabled="disabled" style="text-transform: none;" :class="{'text-white': dark}" :icon="!!icon">
      <template v-if="icon" v-slot:default>
        <v-icon>mdi-{{ icon }}</v-icon>
        <template v-if="!hideTips && tips">
          <v-tooltip activator="parent">{{ tips }}</v-tooltip>
        </template>
      </template>
    </v-btn>
  </template>
  <template v-else-if="shorten">
    <v-btn :variant="back ? 'outlined' : (!smAndUp && icon) ? 'text' : variant"
           :min-width="(icon && !smAndUp)  || block ? undefined : minWidth"
           :color="back ? 'error' : color" :size="size"
           :icon="!icon || smAndUp ? undefined : 'mdi-' + icon"
           :elevation="elevation" :block="block" :rounded="rounded"
           :prepend-icon="prependIcon && icon ? `mdi-` + icon : undefined"
           :append-icon="appendIcon && icon ? `mdi-` + icon : undefined"
           :disabled="disabled" class="font-weight-bold"
           style="text-transform: none;" :class="{'text-white': dark}">
      <template v-slot:prepend v-if="prependIconColor && smAndUp">
        <v-icon :color="prependIconColor"/>
      </template>
      <!--      大きいとき、またはアイコンがないとき-->
      <template v-if="smAndUp || !icon" v-slot:default>
        {{ text }}
        <template v-if="!hideTips">
          <v-tooltip v-if="tips" activator="parent">{{ tips }}</v-tooltip>
          <v-tooltip v-else activator="parent">{{ text }}</v-tooltip>
        </template>
      </template>
      <template v-slot:append v-if="appendIconColor && smAndUp">
        <v-icon :color="appendIconColor"/>
      </template>
    </v-btn>
  </template>
  <template v-else>
    <v-btn :variant="back ? 'outlined' : variant"
           :min-width="block ? undefined : minWidth"
           :color="back ? 'error' : color"
           :size="size"
           :elevation="elevation" :block="block" :rounded="rounded"
           :prepend-icon="prependIcon && icon ? `mdi-` + icon : undefined"
           :append-icon="appendIcon && icon ? `mdi-` + icon : undefined"
           :disabled="disabled"
           class="font-weight-bold" style="text-transform: none;" :class="{'text-white': dark}">
      <template v-slot:prepend v-if="prependIconColor">
        <v-icon :color="prependIconColor"/>
      </template>
      <template v-slot:default>
        {{ text }}
        <v-tooltip v-if="tips" activator="parent">{{ tips }}</v-tooltip>
      </template>
      <template v-slot:append v-if="appendIconColor">
        <v-icon :color="appendIconColor"/>
      </template>
    </v-btn>
  </template>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "Btn"
});
</script>
<script setup lang="ts">

import {useDisplay} from "vuetify";

interface Props {
  text?: string,
  tips?: string,
  variant?: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain",
  color?: string,
  minWidth?: string | number,
  icon?: string | boolean
  prependIcon?: boolean,//ボタン前方にアイコンを表示
  appendIcon?: boolean,//ボタン後方にアイコンを表示
  prependIconColor?: string | undefined,
  appendIconColor?: string | undefined,
  size?: string | number,
  elevation?: string | number,
  dark?: boolean,
  block?: boolean,
  back?: boolean,
  shorten?: boolean,
  rounded?: number | boolean | string,
  disabled?: boolean,
  hideTips?: boolean,
}

const Props = withDefaults(defineProps<Props>(), {
  text: undefined,
  tips: undefined,
  variant: 'elevated',
  color: 'primary',
  minWidth: 120,
  icon: false,
  prependIcon: false,
  appendIcon: false,
  prependIconColor: undefined,
  appendIconColor: undefined,
  size: "default",
  elevation: undefined,
  dark: false,
  block: false,
  back: false,
  shorten: false,
  rounded: 6,
  disabled: false,
  hideTips: false,
})

const {smAndUp} = useDisplay();

</script>
