import { usePokemonsStore, type Pokemon } from '@/stores/pokemonsStore'
import Fuse from 'fuse.js'
import { toRefs } from 'vue'
import type { PokemonDetailResponse } from './adapters/external-pokemon.interfaces'
import { adaptFullPokemon } from './adapters/pokemonAdapter'

export const usePokemonService = () => {
  const pokemonStore = usePokemonsStore()

  const { pokemonList, pageSize, maxPokemons } = toRefs(pokemonStore)

  const stopFetch = (page: number) => {
    const cachedPokemons: Pokemon[] = pokemonList.value

    const pokemonsQty = cachedPokemons.length

    return (
      pokemonsQty >= pageSize.value * page ||
      (maxPokemons.value && pokemonsQty >= maxPokemons.value)
    )
  }

  const fetchPokemons = async (page: number) => {
    if (stopFetch(page)) return

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pokemon?limit=${pageSize.value}&offset=${pageSize.value * (page - 1)}`,
    )

    const data = (await response.json()) as { results: Pokemon[]; count: number }

    const pokemons: Pokemon[] = data.results

    pokemonStore.$patch((state) => {
      state.maxPokemons = data.count
      state.pokemonList = [...state.pokemonList, ...pokemons]
    })
  }

  const difuseSearch = async (pokemons: Pokemon[], pokemonName: string) => {
    const fuseOptions = {
      keys: ['name'],
      includeScore: false,
      threshold: 0.3,
    }

    const fuse = new Fuse(pokemons, fuseOptions)

    const resultSearch = fuse.search(pokemonName)

    const pokemonsBySearch = resultSearch.map((r) => r.item)

    return pokemonsBySearch
  }

  const fetchAllPokemons = async (): Promise<Pokemon[]> => {
    const allPokemons = pokemonStore.$state.allPokemons

    if (allPokemons.length > 0) {
      return allPokemons
    }

    const pokemonsData = await fetch(
      `${import.meta.env.VITE_API_URL}/pokemon?limit=100000&offset=0`,
    )
    const data = await pokemonsData.json()
    const allPokemos = data.results as Pokemon[]

    return allPokemos
  }

  const findPokemonsByName = async (pokemonName: string) => {
    const pokemonsData = await fetchAllPokemons()

    return difuseSearch(pokemonsData, pokemonName)
  }

  const getFullPokemon = async (name: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/${name}`, {
      cache: 'force-cache',
    })
    const data = (await response.json()) as PokemonDetailResponse

    const fullPokemon = adaptFullPokemon(data)

    return fullPokemon
  }

  return { fetchPokemons, getFullPokemon, findPokemonsByName }
}
