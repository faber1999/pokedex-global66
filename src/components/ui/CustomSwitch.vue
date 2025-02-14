<script setup lang="ts">
const checked = defineModel('checked', {
  type: Boolean,
  default: false,
})

const emits = defineEmits(['update:checked'])

const toggleSwitch = () => {
  emits('update:checked', checked.value)
}
</script>

<template>
  <label class="relative inline-flex cursor-pointer items-center">
    <input type="checkbox" class="peer sr-only" v-model="checked" @change="toggleSwitch" />
    <div
      class="peer h-6 w-11 rounded-full bg-custom-base-4 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-custom-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-0"
    ></div>
  </label>
</template>
