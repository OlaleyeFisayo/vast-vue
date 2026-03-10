<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import type {
  StyleValue,
} from "vue";
import {
  VUE_TREE_STATES,
} from "../variables";
import VueEntry from "./vue-entry.vue";

defineProps<{
  vueNodes?: VueNode[];
  style?: StyleValue;
}>();
</script>

<template>
  <template v-if="vueNodes !== undefined">
    <div
      v-for="node in vueNodes"
      :key="node.type"
      :style="style"
    >
      <VueEntry :node="node" />
      <VueEntries
        v-if="node.type === 'element' && node.children.length > 0"
        :style="{ marginLeft: VUE_TREE_STATES.fileGap }"
        :vue-nodes="node.children"
      />
    </div>
  </template>
</template>
