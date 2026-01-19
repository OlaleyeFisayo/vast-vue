<script setup lang="ts">
import {
  getRootPathBasename,
} from "@vast/file-explorer";
import {
  onBeforeMount,
  ref,
} from "vue";

const rootDirectoryName = ref("");

onBeforeMount(async () => {
  const fileName = await getRootPathBasename();
  rootDirectoryName.value = fileName;
});
</script>

<template>
  <Card
    pt:root:class="w-full h-[55px] rounded-none flex"
    pt:body:class="h-full flex flex-row gap-4 px-3 items-center justify-between"
    pt:content:class="flex flex-row gap-4 items-center"
    pt:footer:class="flex flex-row gap-2 items-center"
  >
    <template #content>
      <h1 class="text-lg font-bold">
        {{ rootDirectoryName }}
      </h1>
    </template>
  </Card>
</template>
