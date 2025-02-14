import PokemonDetailView from '@/views/PokemonDetailView.vue'
import PokemonListView from '@/views/PokemonListView.vue'
import WelcomeView from '@/views/WelcomeView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: PokemonListView,
      children: [
        {
          path: ':name',
          component: PokemonDetailView,
        },
      ],
    },
  ],
})

export default router
