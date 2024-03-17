// 「N-DEV」により作成されました。
<template>
  <v-app>
    <Html lang="ja"/>
    <l-app-bar/>
    <l-side-navigation/>
    <v-main style="overflow-x: hidden;">
      <my-alert/>
      <my-overlay/>
      <div class="mx-auto">
        <NuxtPage/>
      </div>
    </v-main>
    <l-footer/>
  </v-app>
</template>

<script setup lang="ts">
import {useDisplay} from 'vuetify';
import {useStore, useFirebaseAuth} from "~/composables";

let {isSignedIn, user, title, drawer} = useStore();
const router = useRouter();
let firebaseAuth;
onMounted(() => {
  drawer.value = mdAndUp.value;
  firebaseAuth = useFirebaseAuth(); //NOTE: Firebase Authentication を使用する場合
})

const {mdAndUp} = useDisplay();
watch(mdAndUp, () => {
  drawer.value = mdAndUp.value;
});

</script>
