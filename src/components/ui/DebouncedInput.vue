<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  delay: {
    type: Number,
    default: 500,
  },
})

const emits = defineEmits(['update:value'])

const inputValue = ref(props.value)

// Sincroniza el valor interno si cambia el modelValue externamente
watch(
  () => props.value,
  (newVal) => {
    inputValue.value = newVal
  },
)

// Función de actualización con debounce
const debouncedUpdate = useDebounceFn(() => {
  emits('update:value', inputValue.value)
}, props.delay)

// Observa el valor interno y emite el cambio de forma debounced
watch(inputValue, () => {
  if (inputValue.value === '') {
    emits('update:value', inputValue.value)
    return
  }
  debouncedUpdate()
})
</script>

<template>
  <div class="flex-grow rounded-lg bg-white">
    <input
      id="search"
      type="search"
      class="h-[50px] w-full rounded-lg border border-custom-base-4 p-2 pl-[43px] text-base text-custom-base-6 placeholder:text-custom-base-4 focus:border-custom-base-5 focus:outline-none"
      v-model="inputValue"
      placeholder="Search"
    />
  </div>
</template>

<style scoped>
#search {
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3Ljc1NTIgMTUuNTYyMkwxNC4yNDk5IDEyLjA1NzRDMTQuMDkxNyAxMS44OTkyIDEzLjg3NzIgMTEuODExMyAxMy42NTIyIDExLjgxMTNIMTMuMDc5MUMxNC4wNDk1IDEwLjU3MDUgMTQuNjI2MSA5LjAwOTY3IDE0LjYyNjEgNy4zMTE3OUMxNC42MjYxIDMuMjcyNzMgMTEuMzUyOCAwIDcuMzEzMDQgMEMzLjI3MzI5IDAgMCAzLjI3MjczIDAgNy4zMTE3OUMwIDExLjM1MDggMy4yNzMyOSAxNC42MjM2IDcuMzEzMDQgMTQuNjIzNkM5LjAxMTIxIDE0LjYyMzYgMTAuNTcyMyAxNC4wNDcxIDExLjgxMzQgMTMuMDc2OFYxMy42NDk4QzExLjgxMzQgMTMuODc0OCAxMS45MDEzIDE0LjA4OTIgMTIuMDU5NSAxNC4yNDc0TDE1LjU2NDggMTcuNzUyMkMxNS44OTUzIDE4LjA4MjYgMTYuNDI5NyAxOC4wODI2IDE2Ljc1NjcgMTcuNzUyMkwxNy43NTE3IDE2Ljc1NzNDMTguMDgyMiAxNi40MjY5IDE4LjA4MjIgMTUuODkyNiAxNy43NTUyIDE1LjU2MjJaTTcuMzEzMDQgMTEuODExM0M0LjgyNzMxIDExLjgxMTMgMi44MTI3MSA5LjgwMDYxIDIuODEyNzEgNy4zMTE3OUMyLjgxMjcxIDQuODI2NDggNC44MjM3OSAyLjgxMjIzIDcuMzEzMDQgMi44MTIyM0M5Ljc5ODc2IDIuODEyMjMgMTEuODEzNCA0LjgyMjk3IDExLjgxMzQgNy4zMTE3OUMxMS44MTM0IDkuNzk3MDkgOS44MDIyOCAxMS44MTEzIDcuMzEzMDQgMTEuODExM1oiIGZpbGw9IiNCRkJGQkYiLz4KPC9zdmc+Cg==)
    no-repeat 15px center;
}
/*
.input-search[data-v-d76f6c3e] {
  background: #fff  no-repeat 13px center;
  box-shadow: 0 2px 10px #0000000a;
} */
</style>
