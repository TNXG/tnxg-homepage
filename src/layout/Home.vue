<script>
import { useBlurHashStore } from '../store/blurHashStore';
import { computed } from 'vue';
import SelfCard from '@/components/SelfCard.vue';

export default {
    components: {
        SelfCard,
    },
    setup() {
        const store = useBlurHashStore();
        const blurredImageData = computed(() => store.hash);

        return {
            blurredImageData,
        };
    }
};
</script>
<template>
    <mdui-card ref="backgroundImage" class="centered max-w-4xl mx-auto px-4 py-8"
        :style="{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)), url(${blurredImageData})` }">
        <SelfCard />
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: cover;
}

/* 添加媒体查询以在小屏幕设备上为 mdui-card 添加上边距 */
@media (max-width: 600px) {
    mdui-card {
        margin-top: 80px;
    }
}
</style>
