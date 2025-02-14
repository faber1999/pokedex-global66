import type { FullPokemon } from '@/stores/pokemonsStore'
import type { PokemonDetailResponse } from './external-pokemon.interfaces'

export const adaptFullPokemon = (pokemon: PokemonDetailResponse): FullPokemon => {
  const fullPokemon: FullPokemon = {
    name: pokemon.name,
    detail: {
      id: pokemon.id,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types.map((type) => type.type.name),
    },
  }

  return fullPokemon
}
