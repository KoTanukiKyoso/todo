// 「N-DEV」により作成されました。
<style scoped lang="scss"></style>
<template>
  <div class="image-input__field" style="max-width: 600px;" :class="{'over': p.isDragOver}"
       @dragover.prevent="onDrag('over')" @dragleave="onDrag('leave')" @drop.stop="onDrop">
    <input type="file" title @change="onChange" :accept="mimeType">
    ここをクリックしてファイルを選択<br>またはD＆Dでファイルを追加できます
  </div>
</template>

<script lang="ts">
export default defineComponent({
  layout: false,
  name: "FileSelector",
});
</script>
<script setup lang="ts">
import {useStore, useTasks} from "~/composables";

let {addMessage} = useStore();
let tasks = useTasks();

let p = reactive({
  isDragOver: false,
});
let file = defineModel<File | null>();

export interface Props {
  maxSize?: number,
  fileTypes?: string[],
  mimeType?: string,
}

const Props = withDefaults(defineProps<Props>(), {
  maxSize: 300,//KB
  fileTypes: () => ["jpg", "jpeg", "png", "webp", "gif", "jfif", "bmp"],
  mimeType: "text/plane",
});

const emit = defineEmits<{
  (e: 'changed'): void
}>();

const onDrag = (type: string) => {
  p.isDragOver = type === "over";
};

const onDrop = () => {
  p.isDragOver = false;
};

const onChange = (event: Event) => {
  if (!file) return;
  event.preventDefault();
  if (!event.target) return;
  const target = event.target as HTMLInputElement;
  if (!target.files) return;
  const files = target.files;
  if (!files || files.length === 0) {
    if (!file) return;
    file.value = null;
    return;
  }
  if (files.length > 1) {
    addMessage({
      text: `選択可能なファイル数は1つです。`
    });
    return;
  }
  if (files[0].size > Props.maxSize * 1024) {
    addMessage({
      text: `ファイルサイズが大きすぎます。${Props.maxSize}KB以下のファイルを選択してください。`
    });
    return;
  }
  tasks.value++;
  let _file = files[0];
  let types = _file.name.split(".")
  let type = types[types.length - 1].toLocaleLowerCase()
  if (!Props.fileTypes.includes(type)) {
    addMessage({
      text: `ご利用いただけないファイル形式です。`
    });
    file.value = null;
  } else {
    file.value = _file;
  }
  tasks.value--;
};

</script>
