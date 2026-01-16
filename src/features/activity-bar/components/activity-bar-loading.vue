<template>
  <Card
    pt:root:class="w-[55px] h-auto rounded-none"
    pt:body:class="h-dvh px-0 m-0 flex flex-col justify-between gap-4"
    pt:content:class="w-full flex flex-col gap-4 items-center"
    pt:footer:class="w-full flex flex-col gap-4 items-center"
  >
    <template #content>
      <Skeleton
        v-for="n in 5"
        :key="n"
        width="2rem"
        height="2rem"
      />
    </template>
    <template #footer>
      <Skeleton
        v-for="n in 2"
        :key="n"
        width="2rem"
        height="2rem"
      />
    </template>
  </Card>
</template>
