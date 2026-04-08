<script lang="ts" setup>
import {
  Search,
} from "lucide-vue-next";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
</script>

<template>
  <header class="flex items-center justify-between px-4 py-1">
    <section class="flex items-center gap-1">
      <img
        src="/logo.png"
        alt="brickly logo"
        class="w-8 h-8"
      >
      <p class="text-xl text-white font-semibold font-inter">
        Brickly
      </p>
    </section>
    <section>
      <InputGroup class="h-fit bg-background-100 rounded-none border-0 outline-0 ring-0!">
        <InputGroupInput
          placeholder="Search components.."
          class="h-fit p-2.5"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </section>
  </header>
</template>
