// router.d.ts
import 'vue-router'
import type { RouteRecordInfo } from 'vue-router'

export interface RouteNamedMap {
  welcome: RouteRecordInfo<'welcome', '/', Record<never, never>, Record<never, never>>
  pokemons: RouteRecordInfo<'pokemons', '/pokemons', Record<never, never>, Record<never, never>>
  '/pokemons/[name]': RouteRecordInfo<
    '/pokemons/[name]',
    '/pokemons/:name',
    { name: string },
    { name: string }
  >
}

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
