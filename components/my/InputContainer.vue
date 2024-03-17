// 「N-DEV」により作成されました。
<style scoped lang="scss">
.font-13 {
  font-size: 13px;
}

.font-14 {
  font-size: 14px;
  margin-right: 8px;
}

</style>
<template>
  <div class="flex-fill mb-4" :style="{maxWidth: maxWidth === 0 ? `auto` : maxWidth + `px`,
  minWidth: minWidth === 0 ? `auto` : minWidth + `px`}">
    <div :class="[{'pb-2': !dense}, {'pb-1': dense}]">
      <v-chip v-if="showRequire" :label="true" small color="red" dark :class="[{'mr-2 font-14': !dense},{'font-13 px-1 mr-1': dense}]"
              :density="dense ? 'comfortable' : 'default'">必須
      </v-chip>
      <v-chip v-else-if="!showRequireSpace && showNotRequire" :label="true" small color="grey" dark
              :class="[{'font-14 mr-2': !dense},{'font-13 px-1 mr-1': dense}]" :density="dense ? 'comfortable' : 'default'">任意
      </v-chip>
      <div v-else-if="showRequireSpace" style="width: 48px; height: 10px;" class="mr-2 d-inline-block"/>
      <span :class="[{'font-13': dense}, {'font-14': !dense}]" class="font-weight-bold">{{ label }}</span>
      <my-hint v-if="hint" class="ml-2" :hint="hint" :title="hintTitle"/>
    </div>
    <slot/>
  </div>
</template>

<script>

export default {
  name: "InputContainer",
  data() {
    return {};
  },
  props: {
    maxWidth: {
      type: [Number, String],
      default: 0,
    },
    minWidth: {
      type: [Number, String],
      default: 0,
    },
    showRequire: {
      type: Boolean,
      default: false,
    },
    showNotRequire: {
      type: Boolean,
      default: true,
    },
    showRequireSpace: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    hintTitle: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>
