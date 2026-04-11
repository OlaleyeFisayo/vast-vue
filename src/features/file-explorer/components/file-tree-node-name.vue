<script lang="ts" setup>
defineProps<{
  name: string;
}>();
</script>

<template>
  <p class="truncate text-ellipsis text-sm">
    {{ name }}
  </p>
</template>
