<script setup lang="ts">
import { type PropType } from 'vue'
import IconList from '../icons/IconList.vue'
import IconStar from '../icons/IconStar.vue'
import MyButton from '../ui/MyButton.vue'

type TypeList = 'all' | 'favorites'

defineModel('typeList', {
  type: String as PropType<TypeList>,
  default: 'all',
})
</script>

<template>
  <div
    class="top-shadow fixed bottom-0 left-0 flex h-20 w-full flex-shrink justify-center bg-white"
  >
    <div class="mx-8 flex h-full w-full max-w-[570px] items-center justify-evenly gap-5">
      <MyButton
        :disabled="typeList === 'all'"
        @click="$emit('update:typeList', 'all')"
        class="flex-1 rounded-full"
        :type="typeList === 'all' ? 'primary' : 'default'"
        :class="{
          'cursor-not-allowed': typeList === 'all',
        }"
      >
        <IconList class="size-[22px]" />
        <span>All</span>
      </MyButton>
      <MyButton
        :disabled="typeList === 'favorites'"
        @click="$emit('update:typeList', 'favorites')"
        class="flex-1 rounded-full"
        :type="typeList === 'favorites' ? 'primary' : 'default'"
        :class="{
          'cursor-not-allowed': typeList === 'favorites',
        }"
      >
        <IconStar class="size-[22px]" />
        <span>Favorites</span>
      </MyButton>
    </div>
  </div>
</template>

<style scoped>
.top-shadow {
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1);
}
</style>
