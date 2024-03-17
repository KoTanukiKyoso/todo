<style scoped lang="scss"></style>
<template>
  <v-dialog>
    <template v-slot:activator="{ props: activatorProps }">
      <div v-bind="activatorProps" class="pointer">
        <v-img :src="src" style="width: 100%; height: 100%;"/>
      </div>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card class="pb-4">
        <v-card-title v-if="title" class="d-flex text-white pa-4 pb-2 bg-accent">
          {{ title }}
          <v-spacer/>
          <v-btn v-if="canDownload" variant="text" icon="mdi-download" color="white" @click="download" density="compact"/>
        </v-card-title>
        <v-card-item>
          <v-img v-if="src" :src="src" class="mx-auto"/>
        </v-card-item>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "ImageDialog"
});

</script>
<script setup lang="ts">
import saveAs from 'file-saver';

export interface Props {
  src: string,
  title?: string,
  canDownload?: boolean,
}

const Props = withDefaults(defineProps<Props>(), {
  title: "画像",
  canDownload: false,
});


const makeFile = async () => {
  const response = await fetch(Props.src);
  return await response.blob();
};
const download = async () => {
  let blob = await makeFile()
  saveAs(blob, "image.png");
};

</script>
