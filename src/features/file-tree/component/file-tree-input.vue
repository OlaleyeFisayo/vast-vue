<script lang="ts" setup>
import {
  ref,
} from "vue";

const rootEl = ref<any>(null);

defineExpose({
  $el: rootEl,
  focus: () => rootEl.value?.$el.focus(),
});
</script>

<template>
  <InputText
    ref="rootEl"
    v-bind="$attrs"
    pt:root:class="py-0 px-1"
    type="text"
  />
</template>
