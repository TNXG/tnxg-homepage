<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { MobileStatus } from '@/stores'
import { onMounted, ref } from 'vue'

const mainClass = ref({ 'ml-60': !MobileStatus.get() });

const handleResize = () => {
  MobileStatus.set(window.innerWidth <= 768);
  mainClass.value = { 'ml-60': !MobileStatus.get() };
};

onMounted(() => {
  handleResize(); // 初始检查窗口大小
  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    clearInterval(intervalId);
    window.removeEventListener('resize', handleResize);
  });
});

</script>

<template>
  <div id="Sidebar">
    <Sidebar />
    <div :class="mainClass" id="main">
      <NuxtPage />
    </div>
  </div>
</template>