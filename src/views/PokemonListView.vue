<script setup lang="ts">
import IconSettings from '@/components/icons/IconSettings.vue'
import BottomMenu from '@/components/menu/BottomMenu.vue'
import PokemonItemList from '@/components/pokemon/PokemonItemList.vue'
import DebouncedInput from '@/components/ui/DebouncedInput.vue'
import DropdownSwitch from '@/components/ui/DropdownSwitch.vue'
import EmptyList from '@/components/ui/EmptyList.vue'
import { usePokemonService } from '@/services/pokemonService'
import { type Pokemon, usePokemonsStore } from '@/stores/pokemonsStore'
import { ref, toRefs, watch } from 'vue'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'

const { fetchPokemons, findPokemonsByName } = usePokemonService()

const { pokemonList, favorites } = toRefs(usePokemonsStore())

const foundPokemons = ref<Pokemon[]>()
const pokemonsToShow = ref<Pokemon[]>([])
const search = ref('')
const currentLevelScroll = ref(1)
const isLoading = ref(false)

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

const handleFetch = async (levelScroll: number) => {
  if (typeList.value === 'all' && foundPokemons.value === undefined) {
    isLoading.value = true
    await fetchPokemons(levelScroll)
    isLoading.value = false
    currentLevelScroll.value++
  }
}

const { list, containerProps, wrapperProps } = useVirtualList(pokemonsToShow, {
  // Keep `itemHeight` in sync with the item's row.
  itemHeight: 60,
})

useInfiniteScroll(
  containerProps.ref,
  () => {
    handleFetch(currentLevelScroll.value)
  },
  {
    idle: 200,
    distance: 0,
    canLoadMore: () => {
      return isLoading.value === false
    },
  },
)

watch(
  [typeList, pokemonList, favorites, foundPokemons],
  () => {
    if (foundPokemons.value) {
      pokemonsToShow.value = foundPokemons.value
      return
    }

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
</script>

<template>
  <div class="flex h-full max-h-full flex-col">
    <div class="relative flex h-full flex-col pb-20 pt-[35px]">
      <div class="mb-10 flex gap-2">
        <DebouncedInput v-model:value="search" @update:value="handleSearch" />

        <DropdownSwitch class="flex-shrink">
          <IconSettings class="size-8" />
        </DropdownSwitch>
      </div>

      <EmptyList v-if="foundPokemons?.length === 0" @handle-go-back="search = ''" />

      <div v-bind="containerProps">
        <div v-bind="wrapperProps" class="flex flex-col gap-[10px]">
          <PokemonItemList
            v-for="pokemon in list"
            :key="pokemon.index"
            v-bind:pokemon="pokemon.data"
          />
        </div>
      </div>

      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <BottomMenu v-bind:type-list="typeList" @update:type-list="typeList = $event" />
  </div>
</template>
