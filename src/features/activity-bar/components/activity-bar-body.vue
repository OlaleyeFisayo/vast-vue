<script lang="ts" setup>
import {
  VAST_APP_STATES,
} from "../../../shared/variables";
import {
  useActivitybarStore,
} from "../store";
import {
  ActivityBarList,
} from "../utils/activity-bar-list";

const activityBarStore = useActivitybarStore();
</script>

<template>
  <Card
    pt:root:class="w-[55px] h-full rounded-none"
    pt:body:class="h-full px-0 flex flex-col justify-between gap-4"
    pt:content:class="w-full flex flex-col gap-4 items-center"
  >
    <template #content>
      <button
        v-for="{ title, Icon } in ActivityBarList"
        :key="title"
        v-tooltip="{
          value: title,
          showDelay: VAST_APP_STATES.tooltipShowDelay,
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
