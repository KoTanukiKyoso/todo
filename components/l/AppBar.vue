// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <v-app-bar color="primary" order="1">
    <template v-if="!mdAndUp" v-slot:prepend>
      <v-btn icon="mdi-menu" width="50" @click.stop="drawer = !drawer" color="white"/>
    </template>
    <div class="ml-1 ml-md-4 mr-4" style="background: rgba(255,255,255,0.4); border-radius: 6px;">
      <nuxt-link to="/">
        <v-img contain src="/icon.png" :width="xs ? 34 : 40"/>
      </nuxt-link>
    </div>
    <nuxt-link to="/" style="text-decoration: none; color: white;">
      <v-toolbar-title :style="xs ? { fontSize: '16px' } : {}">
        {{ title }}
      </v-toolbar-title>
    </nuxt-link>
    <v-spacer/>
    <template v-if="isSignedIn">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <button v-bind="props" class="mr-4">
            <v-badge v-if="!emailVerified()" :dot="true" color="#FF3333" overlap>
              <v-avatar size="30" style="background: white;">
                <v-img v-if="user && user.image" width="34" height="34" :src="user.image"/>
                <v-icon v-else style="color: #AAAAAA;" size="30">mdi-account</v-icon>
              </v-avatar>
            </v-badge>
            <v-avatar v-else size="30" style="background: white;">
              <v-img v-if="user && user.image" width="34" height="34" :src="user.image"/>
              <v-icon v-else style="color: #AAAAAA;" size="30">mdi-account</v-icon>
            </v-avatar>
          </button>
        </template>
        <v-list max-width="280">
          <v-list-item class="font-weight-bold" to="/user">
            <template v-slot:prepend>
              <div class="pr-2">
                <v-img v-if="user && user.image" :src="user.image"/>
                <v-icon v-else style="color: grey;" large>mdi-account</v-icon>
              </div>
            </template>
            <v-list-item-title class="align-center d-flex pb-1">
              <v-icon v-if="!emailVerified()" color="error" small class="mr-2">mdi-alert-circle</v-icon>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider class="my-2" color="#AAAAAA"/>
          <v-list-item v-if="false" to="/user">
            <template v-slot:prepend>
              <v-icon class="mr-4">mdi-card-account-details-outline</v-icon>
            </template>
            <v-list-item-title>ユーザ設定</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <template v-slot:prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <div v-else class="pr-3">
      <my-btn variant="outlined" color="white" to="/login" icon="login" shorten append-icon text="ログイン"/>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
export default defineComponent({
  layout: true,
  name: "AppBar",
});
</script>
<script setup lang="ts">
import {useStore, useFirebaseAuth} from "~/composables";
import {useDisplay} from "vuetify";

let {isSignedIn, user, title, drawer, emailVerified} = useStore();
const router = useRouter();
const {xs, mdAndUp} = useDisplay();
let firebaseAuth: any;
onMounted(() => {
  // firebaseAuth = useFirebaseAuth(); //NOTE: Firebase Authentication を使用する場合
})

const logout = () => {
  // firebaseAuth.logout(); //NOTE: Firebase Authentication を使用する場合
  navigateTo("/login");
};

</script>
