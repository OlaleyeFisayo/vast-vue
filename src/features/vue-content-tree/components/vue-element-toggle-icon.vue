<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import {
  IconChevronDown,
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
    :is="IconChevronDown"
    v-if="node.type === 'element' && node.selfClosing === false"
    :style="{ width: VUE_TREE_STATES.iconSize, height: VUE_TREE_STATES.iconSize }"
    class="text-primary-800 shrink-0"
  />
</template>
