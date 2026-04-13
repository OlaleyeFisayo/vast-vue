<script setup lang="ts">
import {
  storeToRefs,
} from "pinia";
import CanvasCard from "../components/canvas-card.vue";
import CanvasView from "../components/canvas-view.vue";
import {
  useCanvasNodesStore,
} from "../nodes-store";

const {
  nodes,
} = storeToRefs(useCanvasNodesStore());
</script>

<template>
  <CanvasView>
    <CanvasCard
      v-for="node in nodes"
      :key="node.id"
      :node="node"
    />
  </CanvasView>
</template>
