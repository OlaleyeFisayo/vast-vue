<script lang="ts" setup>
import type {
  ContextMenuTriggerProps,
} from "reka-ui";

defineProps<ContextMenuTriggerProps>();
</script>

<template>
  <ContextMenuTrigger v-bind="$props">
    <slot />
  </ContextMenuTrigger>
</template>
