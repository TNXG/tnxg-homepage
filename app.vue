<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { MobileStatus } from '@/stores'
import { onMounted, watch, ref, nextTick } from 'vue'

const mainClass = ref({ 'ml-60': !MobileStatus.get() });

onMounted(() => {
  MobileStatus.set(window.innerWidth <= 768);
  console.log(window.innerWidth, '草', MobileStatus.get())
  mainClass.value = { 'ml-60': !MobileStatus.get() };
})

watch(MobileStatus, (newValue) => {
  console.log('MobileStatus changed:', newValue);
  nextTick(() => {
    mainClass.value = { 'ml-60': !newValue };
  });
})

</script>

<template>
  <div id="Sidebar">
    <Sidebar />
    <div :class="mainClass" id="main">
      <NuxtPage />
    </div>
  </div>
</template>