<template>
  <Card
    pt:root:class="w-full h-[55px] rounded-none flex"
    pt:body:class="h-full flex flex-row gap-4 items-center justify-between"
    pt:footer:class="flex flex-row gap-2 items-center"
  >
    <template #content>
      <Skeleton
        width="10rem"
        height="2rem"
      />
    </template>
    <template #footer>
      <Skeleton
        v-for="n in 3"
        :key="n"
        width="2rem"
        height="2rem"
      />
    </template>
  </Card>
</template>
