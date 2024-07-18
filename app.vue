<script setup>
import { ref, onMounted, watch } from 'vue';
import Sidebar from '@/components/Sidebar.vue';

const images = [
  "https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
];

const randomImage = ref(images[Math.floor(Math.random() * images.length)]);

const updateBackgroundImage = () => {
  const background = document.getElementById('background');
  const img = new Image();
  img.onload = () => {
    background.style.backgroundImage = `url(${randomImage.value})`;
  };
  img.src = randomImage.value;
};

onMounted(() => {
  updateBackgroundImage();
});

watch(randomImage, () => {
  updateBackgroundImage();
});
</script>

<template>
  <div id="Sidebar">
    <Sidebar>
      <div class="ml-0 lg:ml-60" id="main">
        <NuxtPage />
        <div id="background"
          class="max-w-[50vw] w-auto opacity-[0.5] aspect-[0.5] fixed bottom-0 right-0 h-full bg-cover bg-no-repeat bg-center -z-10 object-cover custom-clip-path">
        </div>
      </div>
    </Sidebar>
  </div>
</template>

<style>
.custom-clip-path {
  clip-path: polygon(30% 0, 100% 0, 70% 100%, 0 100%);
}
</style>