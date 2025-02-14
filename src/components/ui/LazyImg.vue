<script setup lang="ts">
import { ref } from 'vue'
import IconPokeball from '../icons/IconPokeball.vue'

const isLoaded = ref(false)

defineProps({
  class: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
})

function onLoad() {
  isLoaded.value = true
}
</script>

<template>
  <img
    :class="$props.class"
    :src="imageUrl"
    alt="Imagen remota"
    @load="onLoad"
    :style="{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }"
  />

  <div class="absolute flex h-full w-full items-center justify-center">
    <IconPokeball class="w-20" v-if="!isLoaded" />
  </div>
</template>
