// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <div v-if="text">
    <div v-if="showOver">
      <template v-if="newLine">
        <div v-for="(line,i) of dText.split(/\r?\n/g)" :key="i">
          <div v-if="line" :style="{'line-height': lineHeight, 'font-size': fontSize + 'px', color: color}">
            {{ line }}
          </div>
          <div v-else style="height: 12px;"/>
        </div>
      </template>
      <div v-else :style="{'line-height': lineHeight, 'font-size': fontSize + 'px', color: color}">{{ dText }}</div>
      <v-tooltip location="bottom" activator="parent" v-if="showOver">
        <span v-html="nt"/>
      </v-tooltip>
    </div>
    <div v-else>
      <template v-if="newLine">
        <div v-for="(line,i) of dText.split(/\r?\n/g)" :key="i">
          <div v-if="line" :style="{'line-height': lineHeight, 'font-size': fontSize + 'px', color: color}">
            {{ line }}
          </div>
          <div v-else style="height: 12px;"/>
        </div>
      </template>
      <div v-else :style="{'line-height': lineHeight, 'font-size': fontSize + 'px', color: color}">{{ dText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Description",
  mounted() {
    this.nt = this.text.replace(/\r?\n/g, '<br>');
  },
  data() {
    return {
      nt: ""
    };
  },
  props: {
    text: {
      type: String,
      default: "",
      require: true,
    },
    color: {
      type: String,
      default: "#555555",
      require: true,
    },
    fontSize: {
      type: [Number, String],
      default: 16,
      require: true,
    },
    max: {
      type: [Number, String],
      default: 0,
      require: true,
    },
    lineHeight: {
      type: String,
      default: "1.7em",
      require: true,
    },
    showOver: {
      type: Boolean,
      default: true,
      require: true,
    },
    newLine: {
      type: Boolean,
      default: true,
    },
  },
  methods: {},
  computed: {
    dText: function () {
      let dText = this.text;
      if (this.max !== 0) {
        if (this.text.length > this.max) {
          dText = this.text.substring(0, this.max) + "...";
        }
      }
      return dText;
    },
  }
};
</script>
