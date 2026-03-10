<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import VueElementToggleIcon from "./vue-element-toggle-icon.vue";
import VueEntryIcon from "./vue-entry-icon.vue";

defineProps<{
  node: VueNode;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    class="cursor-pointer flex py-0.5 px-1 items-center gap-1 text-primary-800 hover:bg-primary-200"
  >
    <VueElementToggleIcon :node="node" />
    <VueEntryIcon :node="node" />
    <slot />
  </div>
</template>
