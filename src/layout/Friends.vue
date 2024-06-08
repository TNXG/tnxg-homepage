<script>
import { useBlurHashStore } from '../store/blurHashStore';
import { computed, onMounted, ref } from 'vue';
import Friends from '@/components/Friends.vue';

export default {

    components: {
        Friends,
    },
    setup() {
        const store = useBlurHashStore();
        const blurredImageData = computed(() => store.hash);
        const cardRef = ref(null); // 引用mdui-card组件

        // 计算设备宽度并设置相应的顶部边距
        const setTopMargin = () => {
            if (cardRef.value) {
                const deviceWidth = window.innerWidth;
                let topMargin = 'auto'; // 默认值
                if (deviceWidth <= 767) {
                    topMargin = '-30%'; // 调整这个值以达到最佳效果
                }
                cardRef.value.style.marginTop = topMargin;
            }
        };

        onMounted(setTopMargin); // 在组件挂载后调用
        window.addEventListener('resize', setTopMargin); // 监听窗口大小变化

        return {
            blurredImageData, // 添加这行
        };
    }
};
</script>

<template>
    <mdui-card ref="backgroundImage" class="centered max-w-4xl mx-auto px-4 py-8 sm:mt-4"
        :style="{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)), url(${blurredImageData})` }">
        <Suspense>
            <template #default>
                <Friends />
            </template>
            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </mdui-card>
</template>
<style scoped>
@font-face {
    src: url("https://cdn.tnxg.top/fonts/moonbridge.woff2") format('woff2');
    font-family: "moonbridge";
}

*:not(mdui-icon) {
    font-family: "moonbridge";
}

.centered {
    position: absolute;
    background-size: cover;
}

@media (min-width: 600px) {
    .centered {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>