<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Activity from '@/components/Activity.vue';

export default {
    components: {
        Activity,
    },
    setup() {
        const activityKey = ref(0); // 创建一个响应式引用

        let intervalId;

        onMounted(() => {
            intervalId = setInterval(() => {
                activityKey.value++; // 每隔10秒更新activityKey
            }, 5000);
        });

        onUnmounted(() => {
            clearInterval(intervalId); // 组件卸载时清除定时器
        });

        return {
            activityKey,
        };
    }
};
</script>
<template>
    <div class="flex flex-col md:flex-row items-start max-w-4xl mx-auto px-4 py-8">
        <img src="https://api-space.tnxg.top/avatar?s=qq" class="w-24 h-24 object-cover" alt="avatar" />
        <div class="ml-0 md:ml-4 mt-4 md:mt-0">
            <h1 class="text-6xl font-bold">Hello</h1>
            <div class="flex items-center space-x-2">
                <h2 class="text-5xl font-bold mt-4">I'm</h2>
                <h2 class="text-5xl font-bold text-[#007acc] mt-4">
                    <sup class="text-xs">いゆくるず iykrzu</sup><br>天翔TNXG
                </h2>
                <span class="text-2xl font-medium">TiaNXianG</span>
            </div>
            <br />
            <p class="text-xl mt-2">明日尚未到来，希望凝于心上</p>
            <div class="flex flex-wrap items-center gap-4 mt-4">
                <i class="ri-link text-2xl text-gray-600">
                    <a href="#" class="text-xl text-gray-600">https://tnxg.top</a>
                </i>
                <i class="ri-github-line text-2xl text-gray-600">
                    <a href="#" class="text-xl text-gray-600">@TNXG</a>
                </i>
                <i class="ri-twitter-x-line text-2xl text-gray-600">
                    <a href="#" class="text-xl text-gray-600">@iykrzu</a>
                </i>
                <i class="ri-telegram-line text-2xl text-gray-600">
                    <a href="#" class="text-xl text-gray-600">@tianxiang_tnxg</a>
                </i>
            </div>
        </div>
        <div id="activity" class="mt-8 md:mt-0 md:ml-4">
            <Suspense>
                <template #default>
                    <Activity :key="activityKey" />
                </template>
                <template #fallback>
                    <div>Loading...</div>
                </template>
            </Suspense>
        </div>
    </div>
</template>
