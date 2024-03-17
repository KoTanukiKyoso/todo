// 「N-DEV」により作成されました。
<style lang="scss" scoped>
.selected {
  background: #707070;

  .v-list-item-title {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
<template>
  <v-navigation-drawer v-model="drawer" :permanent="!smAndDown" :temporary="smAndDown" width="220"
                       order="3" theme="dark" color="#333333" :rail="isRail" style="z-index: 1006;">
    <template #append>
      <div v-if="drawer" class="text-right mb-2">
        <v-btn variant="text" :icon="isRail ? 'mdi-arrow-expand-right' : 'mdi-arrow-expand-left'" @click="isRail=!isRail"/>
      </div>
      <div v-if="drawer && smAndDown" class="pa-2">
        <v-btn :block="true" @click="drawer=false">閉じる</v-btn>
      </div>
    </template>
    <v-list color="grey" class="py-0" active-class="selected">
      <template v-for="(item, i) in pages">
        <v-list-item v-if="!(item.conds.signedIn && !isSignedIn) && !(item.conds.appSelected)" :key="i"
                     :value="item" :to="item.to" height="60" :active="route.path === item.to">
          <template v-slot:prepend>
            <v-icon color="white" size="large" style="opacity: 0.8;" :icon="item.icon"/>
          </template>
          <v-list-item-title v-text="item.title"/>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "SideNavigation"
});
</script>
<script setup lang="ts">
import {useDisplay} from 'vuetify';
import {useStore} from "~/composables";

let {isSignedIn, pages, drawer, isRail} = useStore();
const route = useRoute();

const {smAndDown} = useDisplay();

</script>
