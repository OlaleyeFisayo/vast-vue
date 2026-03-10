<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import {
  IconBraces,
  IconCode,
  IconTextSize,
} from "@tabler/icons-vue";
import {
  VUE_TREE_STATES,
} from "../variables";

defineProps<{
  node: VueNode;
}>();
</script>

<template>
  <component
    :is="node.type === 'element' ? IconCode : node.type === 'interpolation' ? IconBraces : IconTextSize"
    :style="{ width: VUE_TREE_STATES.iconSize, height: VUE_TREE_STATES.iconSize }"
    class="text-primary-800 shrink-0"
  />
</template>
