// 「N-DEV」により作成されました。
<style scoped lang="scss">
.alert {
  z-index: 2450;
  position: fixed;
  top: 20px;
  margin: 5px auto;
  left: 0;
  right: 0;
  width: calc(100% - 20px);
  max-width: 800px;
}
</style>
<template>
  <v-slide-y-transition @after-leave="leave">
    <v-alert v-model="alert" v-if="messages.length > 0 && showing && alert" :type="risks[messages[0].risk]" class="alert"
             :color="risks[messages[0].risk]" border elevation="10" :text="messages[0].text">
      <template v-if="messages[0].dismissible" #close>
        <v-icon @click="nextMessage">mdi-close</v-icon>
      </template>
    </v-alert>
  </v-slide-y-transition>
</template>

<script>
export default defineComponent({
  layout: false,
  name: "Alert"
});
</script>
<script setup>
import {useStore} from "~/composables";

let {addMessage, messages} = useStore();
let risks = ["success", "info", "warning", "error"];
let alert = ref(false);
let showing = ref(false);
const leave = () => {
  showing.value = false;
  alert.value = true;
  if (messages.value.length > 0) {
    messages.value.shift();
  }
};
const nextMessage = () => {
  showing.value = false;
};

watch(messages.value, () => {
  if (showing.value) {
    return;
  }
  let message = messages.value[0];
  if (messages.value.length > 0) {
    alert.value = true;
    showing.value = true;
    console.log(message.text);
    if (!message.dismissible) {
      setTimeout(nextMessage, message.time * 1000);
    }
  }
});

</script>
