<template>

  <div>
    <mdui-navigation-rail alignment="center" divider contained :collapsed="isCollapsed">
      <mdui-button-icon icon="menu" slot="top"></mdui-button-icon>
      <mdui-button-icon icon="settings" slot="bottom"></mdui-button-icon>
      <mdui-navigation-rail-item id="home-button" autofocus icon="home">首页</mdui-navigation-rail-item>
      <mdui-navigation-rail-item id="about-button" autofocus icon="account_circle">关于</mdui-navigation-rail-item>
      <mdui-navigation-rail-item id="friends-button" autofocus icon="diversity_2">朋友</mdui-navigation-rail-item>
    </mdui-navigation-rail>
    <div style="height: 600px;overflow: auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import { getColorFromImage, setColorScheme } from 'mdui';
import { useBlurHashStore } from './store/blurHashStore';

import { decode } from 'blurhash';

export default {
  mounted() {
    const router = useRouter()

    this.$nextTick(function () {
      document.getElementById('home-button').addEventListener("click", (event) => {
        console.log('home-button click event')
        router.push('/')
      });

      document.getElementById('about-button').addEventListener("click", (event) => {
        console.log('about-button click event')
        router.push('/about')
      });

      document.getElementById('friends-button').addEventListener("click", (event) => {
        console.log('friends-button click event')
        router.push('/friends')
      });
    })
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    blurredImage(blurhash) {
      if (!blurhash) return '';
      const pixels = decode(blurhash, 32, 32);
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(32, 32);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    },

  },
  setup() {
    const store = useBlurHashStore();

    const blurredImage = (blurhash) => {
      if (!blurhash) return '';
      const pixels = decode(blurhash, 32, 32);
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(32, 32);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    };
    watchEffect(async () => {
      console.log('Fetching data.');
      try {
        const response = await fetch('https://api-space.tnxg.top/images/wallpaper/?type=json');
        if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
        const data = await response.json();
        document.querySelector('.background-image').style.backgroundImage = `url(${data.image})`;
        const blurredImageData = blurredImage(data.blurhash);
        const ColorImage = new Image();
        ColorImage.src = blurredImageData;
        console.log(getColorFromImage(ColorImage)
          .then(color => {
            setColorScheme(color);
            console.log('Color scheme set.' + color);
          }))
        store.setBlurHash(blurredImageData);
      } catch (error) {
        console.error('Error fetching data:', error);
      };
    });
  },
};
</script>