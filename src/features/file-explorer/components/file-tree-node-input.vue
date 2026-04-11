<script lang="ts" setup>
import {
  onMounted,
  ref,
} from "vue";
import {
  useFileExplorerStore,
} from "../store";

const emit = defineEmits<{
  submit: [value: string];
}>();

const fileExplorerStore = useFileExplorerStore();
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus();
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
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    class="focus:border-2 outline-none text-sm"
    @blur="fileExplorerStore.stopCreating()"
    @keydown.esc="inputRef?.blur()"
    @keydown.enter="handleEnter"
  >
</template>
