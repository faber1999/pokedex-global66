<script setup lang="ts">
import { usePokemonsStore, type Pokemon } from '@/stores/pokemonsStore'
import type { PropType } from 'vue'
import IconStar from '../icons/IconStar.vue'
import MyButton from '../ui/MyButton.vue'

const pokemon = defineModel('pokemon', {
  type: Object as PropType<Pokemon>,
  required: true,
})

const { addFavorite, removeFavorite, isFavorite } = usePokemonsStore()
</script>

<template>
  <RouterLink
    :to="{ path: `/pokemons/${pokemon.name}` }"
    class="flex h-[60px] items-center rounded-lg bg-white px-5"
  >
    <span class="flex-grow text-[22px] font-medium capitalize text-custom-base-6">{{
      pokemon.name
    }}</span>

    <MyButton
      type="ghost"
      class="rounded-full"
      @click.stop.prevent="
        isFavorite(pokemon.name) ? removeFavorite(pokemon.name) : addFavorite(pokemon.name)
      "
    >
      <IconStar
        class="size-[26px] text-custom-base-4 transition-all duration-300"
        :class="{
          '!text-custom-accent': isFavorite(pokemon.name),
        }"
      />
    </MyButton>
  </RouterLink>
</template>
