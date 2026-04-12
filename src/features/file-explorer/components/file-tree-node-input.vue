<script lang="ts" setup>
import {
  onMounted,
  ref,
} from "vue";
import {
  useFileExplorerStore,
} from "../store";

const props = withDefaults(
  defineProps<{
    initialValue?: string;
    onBlur?: () => void;
  }>(),
  {
    initialValue: "",
    onBlur: undefined,
  },
);

const emit = defineEmits<{
  submit: [value: string];
}>();

const fileExplorerStore = useFileExplorerStore();
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.value = props.initialValue;
    inputRef.value.focus();
    inputRef.value.select();
  }
});

function handleEnter() {
  const value = inputRef.value?.value.trim();
  if (value) {
    emit(
      "submit",
      value,
    );
  }
}

function handleBlur() {
  if (props.onBlur) {
    props.onBlur();
  }
  else {
    fileExplorerStore.stopCreating();
  }
}
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    class="focus:border-2 outline-none text-sm w-full"
    @blur="handleBlur"
    @keydown.esc="inputRef?.blur()"
    @keydown.enter="handleEnter"
  >
</template>
