<template>
  <div class="navigation">
    <mdui-navigation-drawer class="drawer">
      <mdui-navigation-rail alignment="center" divider contained>
        <mdui-button-icon id="close-menu-button" icon="menu" slot="top"></mdui-button-icon>
        <mdui-button-icon icon="settings" slot="bottom"></mdui-button-icon>
        <mdui-navigation-rail-item id="home-button" autofocus icon="home">首页</mdui-navigation-rail-item>
        <mdui-navigation-rail-item id="about-button" autofocus icon="account_circle">关于</mdui-navigation-rail-item>
        <mdui-navigation-rail-item id="friends-button" autofocus icon="diversity_2">朋友</mdui-navigation-rail-item>
      </mdui-navigation-rail>
    </mdui-navigation-drawer>
    <mdui-button-icon id="open-menu-button" icon="menu" variant="filled" class="fixed top-0 left-0 mt-4 ml-4 z-20"></mdui-button-icon>
    <div style="height: 600px;overflow: auto">
      <!-- 以下是主页面组件 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 600px) {
  mdui-navigation-drawer {
    width: 21%;
  }

  mdui-navigation-rail {
    width: 100%;
  }
}

@media (min-width: 601px) {
  mdui-navigation-drawer {
    width: 75px;
  }

  mdui-navigation-rail {
    width: 75px;
  }
}
</style>
<script>
import { useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import { getColorFromImage, setColorScheme } from 'mdui';
import { useBlurHashStore } from './store/blurHashStore';

import { decode } from 'blurhash';

export default {
  mounted() {
    const router = useRouter()
    const navigationDrawer = document.querySelector(".drawer");
    const openMenuButton = document.getElementById("open-menu-button");

    //在电脑上默认展开菜单
    if (window.innerWidth > 600) {
      navigationDrawer.open = true
      openMenuButton.style.display = "none"
    } else if (window.innerWidth > 600) {
      navigationDrawer.open = false
      openMenuButton.style.display = ""
    }

    // 添加一个watcher来监听路由的变化
    router.afterEach((to, from) => {
      // 移除所有按钮的激活状态
      ['home-button', 'about-button', 'friends-button'].forEach(id => {
        document.getElementById(id).removeAttribute('active');
      });

      // 根据当前路由设置按钮的激活状态
      if (to.path === '/') {
        document.getElementById('home-button').setAttribute('active', '');
      } else if (to.path === '/about') {
        document.getElementById('about-button').setAttribute('active', '');
      } else if (to.path === '/friends') {
        document.getElementById('friends-button').setAttribute('active', '');
      }
    });

    this.$nextTick(function () {
      document.getElementById('home-button').addEventListener("click", () => {
        console.log('home-button click event');
        router.push('/');
      });

      document.getElementById('about-button').addEventListener("click", () => {
        console.log('about-button click event');
        router.push('/about');
      });

      document.getElementById('friends-button').addEventListener("click", () => {
        console.log('friends-button click event');
        router.push('/friends');
      });

      document.getElementById("close-menu-button").addEventListener("click", () => {
        navigationDrawer.open = false;
        openMenuButton.style.display = "";
      });

      document.getElementById("open-menu-button").addEventListener("click", () => {
        navigationDrawer.open = true;
        openMenuButton.style.display = "none";
        document.querySelector("#app > div > mdui-navigation-drawer").shadowRoot.querySelector("div").remove()


      });
    })
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
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