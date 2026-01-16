<script lang="ts" setup>
import type {
  ActivityBarItems,
} from "../types";
import {
  IconComponents,
  IconFile,
} from "@tabler/icons-vue";
import {
  useActivitybarStore,
} from "../store";

const activityBarStore = useActivitybarStore();

const ActivityBarList: ActivityBarItems[] = [
  {
    title: "Files",
    Icon: IconFile,
  },
  {
    title: "Components",
    Icon: IconComponents,
  },
];
</script>

<template>
  <Card
    pt:root:class="w-[55px] h-full rounded-none"
    pt:body:class="h-full px-0 m-0 flex flex-col justify-between gap-4"
    pt:content:class="w-full flex flex-col gap-4 items-center"
  >
    <template #content>
      <button
        v-for="{ title, Icon } in ActivityBarList"
        :key="title"
        v-tooltip="{
          value: title,
          showDelay: 1000,
        }"
        :class="`cursor-pointer w-full flex items-center justify-center ${activityBarStore.activityInView === title ? 'border-l-3 border-white text-white' : 'text-gray-500'} hover:text-white`"
        type="button"
        @click="activityBarStore.changeActivityInView(title)"
      >
        <component
          :is="Icon"
          class="size-8"
        />
      </button>
    </template>
  </Card>
</template>
