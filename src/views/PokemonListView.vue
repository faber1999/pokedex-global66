<script setup lang="ts">
import IconSettings from '@/components/icons/IconSettings.vue'
import BottomMenu from '@/components/menu/BottomMenu.vue'
import PokemonItemList from '@/components/pokemon/PokemonItemList.vue'
import DebouncedInput from '@/components/ui/DebouncedInput.vue'
import DropdownSwitch from '@/components/ui/DropdownSwitch.vue'
import EmptyList from '@/components/ui/EmptyList.vue'
import InfinityScroll from '@/components/ui/InfinityScroll.vue'
import { usePokemonService } from '@/services/pokemonService'
import { type Pokemon, usePokemonsStore } from '@/stores/pokemonsStore'
import { ref, toRefs, watch } from 'vue'

const { fetchPokemons, findPokemonsByName } = usePokemonService()

const { pokemonList, favorites } = toRefs(usePokemonsStore())

const foundPokemons = ref<Pokemon[]>()
const pokemonsToShow = ref<Pokemon[]>([])

const typeList = ref<string>('all')

const handleSearch = async (value: string = '') => {
  if (value === '') {
    foundPokemons.value = undefined
    clearSearch()
    return
  }

  const pokemons = await findPokemonsByName(value)
  foundPokemons.value = pokemons
}

const clearSearch = () => {
  foundPokemons.value = undefined
}

const handleFetch = (levelScroll: number) => {
  if (typeList.value === 'all' && foundPokemons.value === undefined) {
    fetchPokemons(levelScroll)
  }
}

watch(
  [typeList, pokemonList, favorites],
  () => {
    if (typeList.value === 'all') {
      pokemonsToShow.value = pokemonList.value
      return
    }

    pokemonsToShow.value = pokemonList.value.filter((pokemon) =>
      favorites.value.includes(pokemon.name),
    )
  },
  {
    immediate: true,
  },
)

const search = ref('')
</script>

<template>
  <div class="flex h-full max-h-full flex-col">
    <div class="relative flex h-full flex-col pb-20 pt-10">
      <div class="mb-12 flex gap-2">
        <DebouncedInput v-model:value="search" @update:value="handleSearch" />

        <DropdownSwitch class="flex-shrink">
          <IconSettings class="size-8" />
        </DropdownSwitch>
      </div>

      <EmptyList v-if="foundPokemons?.length === 0" @handle-go-back="search = ''" />

      <InfinityScroll v-else @reached-bottom="handleFetch" class="flex-grow">
        <div class="flex flex-col gap-4">
          <PokemonItemList
            v-for="pokemon in foundPokemons ?? pokemonsToShow"
            :key="pokemon.name"
            v-bind:pokemon="pokemon"
          />
        </div>
      </InfinityScroll>

      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <BottomMenu v-bind:type-list="typeList" @update:type-list="typeList = $event" />
  </div>
</template>
