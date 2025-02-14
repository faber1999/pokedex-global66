<script setup lang="ts">
import MyButton from './MyButton.vue'

defineEmits(['handleGoBack'])
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <span class="text-4xl font-bold text-custom-base-6">Uh-oh!</span>
    <span class="text-xl text-custom-base-5">Yoy look lost on your journey!</span>

    <MyButton
      class="w-fit rounded-full text-lg"
      type="primary"
      @click="() => $emit('handleGoBack')"
    >
      Go back home
    </MyButton>
  </div>
</template>
