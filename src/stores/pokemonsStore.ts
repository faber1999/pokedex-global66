import { getStorage } from '@/assets/utils/localstorage.utility'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PokemonDetail {
  id: number
  weight: number
  height: number
  types: string[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface FullPokemon extends Omit<Pokemon, 'url'> {
  detail: PokemonDetail
}

export const usePokemonsStore = defineStore('pokemon', () => {
  const allPokemons = ref(getStorage<Pokemon[]>('allPokemons', []))

  const persist = ref(getStorage<boolean>('persist', true))
  const pageSize = 40

  const maxPokemons = ref(getStorage<number>('maxPokemons', 0))

  const pokemonList = ref<Pokemon[]>(persist.value ? getStorage<Pokemon[]>('pokemonList', []) : [])
  const favorites = ref<string[]>(persist.value ? getStorage<string[]>('favorites', []) : [])

  const addFavorite = (name?: string) => {
    if (!name) return

    if (!favorites.value.includes(name)) {
      favorites.value.push(name)
    }
  }

  const removeFavorite = (name?: string) => {
    if (!name) return

    const index = favorites.value.indexOf(name)
    if (index > -1) {
      favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (name?: string) => {
    if (!name) return

    return favorites.value.includes(name)
  }

  return {
    persist,
    allPokemons,
    pageSize,
    maxPokemons,
    pokemonList,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
})
