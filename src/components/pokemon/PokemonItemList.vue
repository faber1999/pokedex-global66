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
    class="flex items-center rounded-lg bg-white p-4"
  >
    <h2 class="flex-grow text-xl font-bold capitalize">{{ pokemon.name }}</h2>

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
