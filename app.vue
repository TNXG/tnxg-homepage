<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { MobileStatus } from '@/stores'
import { onMounted } from 'vue'

onMounted(() => {
  MobileStatus.set(window.innerWidth <= 768);
  console.log(MobileStatus.get())
})

</script>

<template>
  <div id="Sidebar">
    <Sidebar />
    <div :class="{ 'ml-60': !MobileStatus.get() }" id="main">
      <NuxtPage />
    </div>
  </div>
</template>