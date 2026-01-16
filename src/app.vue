<script setup lang="ts">
import ActivityBar from "./features/activity-bar/components/index.vue";
import Header from "./features/header/components/index.vue";
</script>

<template>
  <main class="w-full h-dvh flex flex-col">
    <Header />
    <section class="flex h-full">
      <ActivityBar />
    </section>
  </main>
</template>
