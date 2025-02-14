<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import FallbackLoader from './components/loader/FallbackLoader.vue'
import MainLayout from './layouts/MainLayout.vue'
import { usePokemonsStore } from './stores/pokemonsStore'

const colorMode = useColorMode()

onMounted(() => {
  colorMode.value = 'light'

  usePokemonsStore().$subscribe((_mutation, state) => {
    localStorage.setItem('allPokemons', JSON.stringify(state.allPokemons))
    localStorage.setItem('persist', JSON.stringify(state.persist))

    if (!state.persist) {
      localStorage.removeItem('pokemonList')
      localStorage.removeItem('favorites')
      return
    }

    localStorage.setItem('maxPokemons', JSON.stringify(state.maxPokemons))
    localStorage.setItem('pokemonList', JSON.stringify(state.pokemonList))
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  })
})
</script>

<template>
  <MainLayout>
    <Suspense>
      <template #default>
        <RouterView v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </template>

      <template #fallback>
        <div class="flex h-full items-center justify-center">
          <FallbackLoader />
        </div>
      </template>
    </Suspense>
  </MainLayout>
</template>
