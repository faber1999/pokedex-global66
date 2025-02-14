<script setup lang="ts">
import type { PropType } from 'vue'

type ButtonType = 'default' | 'primary' | 'ghost'

defineProps({
  type: { type: String as PropType<ButtonType>, default: 'default' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :disabled="disabled"
    class="flex h-11 min-w-[44px] items-center justify-center gap-[10px] rounded text-lg font-bold text-white transition-all"
    :class="{
      ['bg-custom-base-4 hover:enabled:bg-custom-base-5']: type === 'default',
      ['bg-custom-base-2 hover:enabled:bg-custom-base-3']: type === 'ghost',
      ['bg-custom-primary hover:enabled:bg-custom-secondary']: type === 'primary',
    }"
  >
    <slot></slot>
  </button>
</template>
