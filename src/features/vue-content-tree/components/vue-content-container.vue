<script lang="ts" setup>
import {
  useSearchParams,
} from "@shared/hooks/use-search-params";
import VueContentContainerActions from "./vue-content-container-actions.vue";
import VueContentTree from "./vue-content-tree.vue";

const params = useSearchParams();
</script>

<template>
  <div
    v-show="params.vueFile"
    class="w-67.5 h-full bg-primary-500 border-r border-primary-700 text-primary-800 flex flex-col"
  >
    <VueContentContainerActions />
    <VueContentTree />
  </div>
</template>
