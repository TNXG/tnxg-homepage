<script setup>
import Sidebar from '@/components/Sidebar.vue';

onMounted(() => {
  const images = [
    "https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const background = document.getElementById('background');
  const img = new Image();
  img.onload = () => {
    background.style.backgroundImage = `url(${randomImage})`;
  };
  img.src = randomImage;
});
</script>

<template>
  <div id="Sidebar">
    <Sidebar>
      <div class="ml-0 lg:ml-60" id="main">
        <NuxtPage />
        <div id="background" class="max-w-[50vw] w-auto aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-10 object-cover"></div>
      </div>
    </Sidebar>
  </div>
</template>