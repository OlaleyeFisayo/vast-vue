<script setup lang="ts">
import Header from "@features/header/components/header.vue";
import {
  Toaster,
} from "@shared/components/ui/sonner";
</script>

<template>
  <Toaster
    rich-colors
    theme="dark"
  />
  <main class="w-full h-dvh text-primary-300">
    <Header />
  </main>
</template>
