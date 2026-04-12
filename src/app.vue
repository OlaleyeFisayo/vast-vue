<script setup lang="ts">
import {
  Toaster,
} from "@shared/components/ui/sonner";
import Header from "@/features/header/components/header.vue";
import PanelContent from "@/features/panel-menu/components/panel-content.vue";
import PanelMenu from "@/features/panel-menu/components/panel-menu.vue";
</script>

<template>
  <Toaster
    rich-colors
    theme="dark"
  />
  <main class="w-full h-dvh flex flex-col text-primary-300">
    <Header />
    <section class="flex flex-1 overflow-hidden">
      <PanelMenu />
      <PanelContent />
    </section>
  </main>
</template>
