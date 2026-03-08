<script lang="ts" setup>
import type {
  SplitterGroupEmits,
  SplitterGroupProps,
} from "reka-ui";

defineProps<SplitterGroupProps>();
defineEmits<SplitterGroupEmits>();
</script>

<template>
  <SplitterGroup
    v-bind="$props"
    v-on="$attrs"
  >
    <slot />
  </SplitterGroup>
</template>
