<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";

defineProps<{
  node: VueNode;
}>();
</script>

<template>
  <div
    v-bind="$attrs"
    class="cursor-pointer flex py-0.5 px-1 items-center gap-1 text-primary-800 hover:bg-primary-200"
  >
    <slot />
  </div>
</template>
