<script setup lang="ts">
import { usePokemonsStore } from '@/stores/pokemonsStore'
import { onMounted, onUnmounted, ref, toRefs } from 'vue'
import CustomSwitch from './CustomSwitch.vue'
import MyButton from './MyButton.vue'

const { persist } = toRefs(usePokemonsStore())

const items = ref([{ id: 1, name: 'Persist data', enabled: persist.value }])

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleUpdate = (id: number, status: boolean) => {
  if (id === 1) {
    persist.value = status
  }
}

const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div>
    <MyButton
      type="ghost"
      @click.stop="toggleDropdown"
      class="flex aspect-square h-full items-center justify-center rounded-full !px-1 text-white"
    >
      <slot> Toggle Dropdown </slot>
    </MyButton>

    <Transition name="slide-fade">
      <div
        ref="dropdownRef"
        v-if="dropdownOpen"
        class="absolute right-0 w-fit translate-y-1 rounded-lg border border-gray-300 bg-white p-4"
      >
        <div>
          <ul class="list-none">
            <li
              v-for="item in items"
              :key="item.id"
              class="flex items-center justify-between gap-4"
            >
              {{ item.name }}
              <CustomSwitch
                v-model:checked="item.enabled"
                @update:checked="handleUpdate(item.id, item.enabled)"
              />
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>
