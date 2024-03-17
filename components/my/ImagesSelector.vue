// 「N-DEV」により作成されました。
<style scoped lang="scss">
* {
  font-size: 16px;
}
</style>
<template>
  <div>
    <div class="image-input__field" style="max-width: 600px;" :class="{'over': isDragOver}"
         @dragover.prevent="onDrag('over')" @dragleave="onDrag('leave')" @drop.stop="onDrop">
      <input type="file" :multiple="maxImage>1" title @change="onChange">
      ここをクリックしてファイルを選択<br>またはD＆Dでファイルを追加できます
    </div>
    <div class="grey-color cb-font-s">選択可能なファイルは
      {{ fileTypes.join(", ") }} です
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "ImagesSelector",
});
</script>

<script setup lang="ts">
import {useStore, useTasks} from "~/composables";
import {readImage} from "~/utils/myUtils";

let {addMessage} = useStore();
let tasks = useTasks();

let images = defineModel<string[]>();

export interface Props {
  maxWidth?: number,
  maxHeight?: number,
  maxSize?: number,
  maxImage?: number,
  addImage?: boolean,
  fileTypes?: string[],
}

const Props = withDefaults(defineProps<Props>(), {
  maxWidth: 1000,
  maxHeight: 1000,
  maxSize: 3,//MB
  maxImage: 4,
  addImage: true,
  fileTypes: () => ["jpg", "jpeg", "png", "webp", "gif", "jfif", "bmp"],
});

const emit = defineEmits<{ (e: 'changed'): void, }>();

let isDragOver: Ref<boolean | string> = ref(false);

const onDrag = (type: boolean | string) => {
  isDragOver.value = type === "over";
}

const onDrop = () => {
  isDragOver.value = false;
}

const onChange = async (event: Event) => {
  event.preventDefault();
  if (!event.target) return;
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const files = target.files;
  if (files.length === 0) {
    if (!Props.addImage) {
      images.value = [];
      emit('changed');
    }
    return;
  }
  if (!Props.addImage) images.value = [];
  if (files.length + images.length > Props.maxImage) {
    addMessage({
      text: `一度に登録可能な画像数は${Props.maxImage}枚までです`
    });
    return;
  }
  tasks.value++;
  for (let file of files) {
    let type: string | string[] = file.name.split(".");
    type = type[type.length - 1].toLocaleLowerCase();
    if (!Props.fileTypes.includes(type)) {
      addMessage({
        text: `送信できない形式のファイルがあります`
      });
    } else {
      let res = await readImage(file, Props.maxWidth, Props.maxHeight, Props.maxSize);
      if (res && images.value) {
        images.value.push(res);
      }
    }
  }
  tasks.value--;
  emit('changed');
}

</script>
