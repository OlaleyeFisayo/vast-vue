<script lang="ts" setup>
import ActivityBarBody from "./activity-bar-body.vue";
import ActivityBarLoading from "./activity-bar-loading.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <ActivityBarBody />
    </template>
    <template #fallback>
      <ActivityBarLoading />
    </template>
  </Suspense>
</template>
