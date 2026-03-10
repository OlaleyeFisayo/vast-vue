<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import {
  computed,
} from "vue";
import VueEntryTemplate from "./vue-entry-template.vue";

const props = defineProps<{
  node: VueNode;
}>();

const nodeText = computed(() => props.node.type === "element" ? props.node.tag : props.node.content);
</script> =>

<template>
  <VueEntryTemplate :node="node">
    <p class="text-left text-nowrap text-ellipsis overflow-hidden">
      {{ nodeText }}
    </p>
  </VueEntryTemplate>
</template>
