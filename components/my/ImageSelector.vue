// 「N-DEV」により作成されました。
<style scoped lang="scss">

</style>
<template>
  <images-selector v-model="images" :max-image="1" :file-types="fileTypes" :max-height="maxHeight" :max-size="maxSize" :max-width="maxWidth"
                   :add-image="false" @changed="onChange"/>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "ImageSelector",
});
</script>
<script setup lang="ts">
import ImagesSelector from "~/components/my/ImagesSelector.vue";

let images: Ref<string[]> = ref([]);
let image = defineModel<string | null>();

export interface Props {
  maxWidth?: number,
  maxHeight?: number,
  maxSize?: number,
  fileTypes?: string[],
}

const Props = withDefaults(defineProps<Props>(), {
  maxWidth: 1000,
  maxHeight: 1000,
  maxSize: 3,//MB
  fileTypes: () => ["jpg", "jpeg", "png", "webp", "gif", "jfif", "bmp"],
});

const emit = defineEmits<{ (e: 'changed'): void, }>();

const onChange = () => {
  if (images.value && images.value.length === 1) {
    image.value = images.value[0];
  } else {
    image.value = null;
  }
  emit('changed');
}

</script>
