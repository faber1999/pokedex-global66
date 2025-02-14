<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'

const { pokemonList, pageSize } = toRefs(usePokemonsStore())

const levelScroll = ref(pokemonList.value.length / pageSize.value || 1)

// Definición de eventos
const emit = defineEmits(['reached-bottom'])

// Referencia al contenedor
const container = ref<HTMLElement>()

// Función que verifica si se llegó al fondo del scroll
const checkScroll = () => {
  if (!container.value) return

  const el = container.value

  if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
    emit('reached-bottom', ++levelScroll.value)
  }
}

onMounted(() => {
  emit('reached-bottom', levelScroll.value)
  if (container.value) container.value.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  if (container.value) container.value.removeEventListener('scroll', checkScroll)
})

watch(pokemonList, () => {
  levelScroll.value = pokemonList.value.length / pageSize.value
})
</script>

<template>
  <!-- Contenedor con scroll (ajusta la altura según necesites) -->
  <div ref="container" class="h-full overflow-y-auto">
    <slot></slot>
  </div>
</template>
