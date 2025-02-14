<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import IconStar from '@/components/icons/IconStar.vue'
import LazyImg from '@/components/ui/LazyImg.vue'
import MyButton from '@/components/ui/MyButton.vue'
import { usePokemonService } from '@/services/pokemonService'
import { usePokemonsStore, type FullPokemon } from '@/stores/pokemonsStore'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { getFullPokemon } = usePokemonService()
const { addFavorite, removeFavorite, isFavorite } = usePokemonsStore()

const pokemon = ref<FullPokemon>()

const image_url = import.meta.env.VITE_IMAGE_URL

const route = useRoute('/pokemons/[name]')
const router = useRouter()

const closeModal = () => {
  router.push({ name: 'pokemons' })
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(async () => {
  const pokemonName = route.params.name

  if (pokemonName) {
    const foundPokemon = await getFullPokemon(pokemonName)

    pokemon.value = foundPokemon
  }
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyUp)
})

// Agregar la función para copiar info del pokemon al portapapeles
const copyPokemonInfo = async () => {
  if (pokemon.value && pokemon.value.detail) {
    const { name } = pokemon.value
    const { weight, height, types } = pokemon.value.detail
    const info = `Name: ${name}, Weight: ${weight}, Height: ${height}, Types: (${types.join(', ')})`
    try {
      await navigator.clipboard.writeText(info)
      // Opcional: notificar que se copió correctamente.
    } catch (error) {
      console.error('Error copiando al portapapeles', error)
    }
  }
}
</script>

<template>
  <div class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    <div class="mx-8 flex h-full w-full items-center justify-center" @click.self="closeModal">
      <div
        class="relative flex h-full max-h-[506px] w-full max-w-[570px] flex-col overflow-hidden rounded-[5px] bg-white shadow-lg"
      >
        <IconClose class="absolute right-2 top-2 z-20 size-7 cursor-pointer" @click="closeModal" />

        <div class="relative mb-6 flex h-[220px] w-full items-center justify-center">
          <img src="/landscape.webp" :alt="pokemon?.name" class="h-full w-full object-fill" />

          <LazyImg
            class="absolute size-[180px] scale-125"
            :image-url="`${image_url}/${pokemon?.detail?.id}.png`"
          />
        </div>

        <div class="px-6">
          <p class="text-lg capitalize text-custom-base-5">
            <span class="font-bold">Name:</span> {{ pokemon?.name }}
          </p>
          <hr class="my-2" />
          <p class="text-lg capitalize text-custom-base-5">
            <span class="font-bold">Weight:</span> {{ pokemon?.detail?.weight }}
          </p>
          <hr class="my-2" />

          <p class="text-lg capitalize text-custom-base-5">
            <span class="font-bold">Height:</span> {{ pokemon?.detail?.height }}
          </p>
          <hr class="my-2" />

          <p class="text-lg capitalize text-custom-base-5">
            <span class="font-bold">Types:</span> {{ pokemon?.detail?.types.join(', ') }}
          </p>
          <hr class="my-2" />
        </div>

        <div class="flex flex-1 items-center justify-between gap-4 px-6">
          <MyButton
            type="primary"
            class="max-w-[195px] flex-grow rounded-full"
            @click="copyPokemonInfo"
          >
            Share to my friends
          </MyButton>
          <MyButton
            type="ghost"
            class="rounded-full"
            @click="
              isFavorite(pokemon?.name) ? removeFavorite(pokemon?.name) : addFavorite(pokemon?.name)
            "
          >
            <IconStar
              class="size-[26px] text-custom-base-4 transition-all duration-300"
              :class="{
                '!text-custom-accent': isFavorite(pokemon?.name),
              }"
            />
          </MyButton>
        </div>
      </div>
    </div>
  </div>
</template>
