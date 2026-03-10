<script lang="ts" setup>
import type {
  VueNode,
} from "@brickly/parser/vue";
import {
  parse,
} from "@brickly/parser/vue";
import {
  useSearchParams,
} from "@shared/hooks/use-search-params";
import {
  computed,
  ref,
  watch,
} from "vue";
import {
  useGetFileContent,
} from "../queries";
import VueEntries from "./vue-entries.vue";

const params = useSearchParams();
const filePath = computed(() => params.vueFile);

const {
  data: fileContent,
} = useGetFileContent(filePath);

const vueNodes = ref<VueNode[] | undefined>(undefined);

watch(
  () => fileContent.value,
  (newFileContent) => {
    if (newFileContent) {
      const parsedData = parse(newFileContent);
      vueNodes.value = parsedData.template;
    }
  },
);
</script>

<template>
  <section
    class="w-full p-2 overflow-x-hidden overflow-y-auto flex-1"
  >
    <VueEntries :vue-nodes="vueNodes" />
  </section>
</template>
