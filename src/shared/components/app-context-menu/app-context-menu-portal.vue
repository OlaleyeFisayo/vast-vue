<script lang="ts" setup>
import type {
  ContextMenuPortalProps,
} from "reka-ui";

defineProps<ContextMenuPortalProps>();
</script>

<template>
  <ContextMenuPortal v-bind="$props">
    <slot />
  </ContextMenuPortal>
</template>
