<template>
    <div v-if="reportMsg && reportMsg.mediaInfo" class="card bg-base-200 flex flex-col justify-end mt-4 lg:mt-0">
        <div class="card-body items-center text-center p-4">
            <h2 class="card-title text-lg lg:text-xl">{{ mediaInfo?.name || reportMsg.mediaInfo.title }}</h2>
            <p v-if="reportMsg.mediaInfo.artist || mediaInfo?.artist" class="text-sm lg:text-base">艺术家: {{
                reportMsg.mediaInfo.artist || mediaInfo?.artist }}</p>
            <div v-if="mediaInfo?.image" class="avatar mt-2">
                <div class="w-24 h-24 rounded-xl">
                    <img :src="mediaInfo?.image" alt="专辑封面">
                </div>
            </div>
            <p v-if="mediaInfo?.tns" class="text-sm text-gray-700">{{ mediaInfo?.tns }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    reportMsg: Object,
    latestMusic: String
});

const mediaInfo = ref(null);

const fetchMediaInfo = async (songName, artist) => {
    if (songName && artist) {
        mediaInfo.value = await $fetch(`/api/getMediainfo?songName=${songName}&artist=${artist}`);
    }
};

watch(() => props.latestMusic, async (newMusic) => {
    if (newMusic && props.reportMsg.mediaInfo) {
        await fetchMediaInfo(props.reportMsg.mediaInfo.title, props.reportMsg.mediaInfo.artist);
    }
});

onMounted(async () => {
    if (props.reportMsg && props.reportMsg.mediaInfo) {
        await fetchMediaInfo(props.reportMsg.mediaInfo.title, props.reportMsg.mediaInfo.artist);
    }
});
</script>