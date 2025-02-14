<script setup lang="ts">
import IconPikachu from '@/components/icons/IconPikachu.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const goToPokemonsView = () => {
  router.push({ name: 'pokemons' })
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <IconPikachu class="mb-5 w-[325px]" />

    <h1 class="text-title my-[30px] text-[26px] font-bold leading-[32px] text-custom-base-6">
      Welcome to Pokédex
    </h1>

    <p class="px-[30px] text-center text-lg leading-[27px] text-custom-base-5 sm:px-0">
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>

    <button
      class="mt-[50px] rounded-full border-none bg-custom-primary px-5 py-[11px] text-lg font-bold leading-[22px] text-white transition-all hover:bg-custom-secondary"
      @click="goToPokemonsView"
    >
      Get started
    </button>
  </div>
</template>
