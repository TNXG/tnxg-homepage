<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    friends: {
        type: Array,
        required: true
    }
});

const shuffledFriends = ref([]);

watch(() => props.friends, (newFriends) => {
    shuffledFriends.value = [...newFriends];
    shuffleArray(shuffledFriends.value);
}, { immediate: true });

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
</script>

<template>
    <div class="w-full flex justify-start mb-6">
        <h1 class="absolute text-4xl m-6"><mark class="line">友情链接</mark></h1>
    </div>
    <div class="container mx-auto mt-20 px-4 py-12 flex flex-col items-center animate-fade-in">
        <div id="friend-card" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="friend in shuffledFriends" :key="friend.id" class="flex">
                <a v-if="!friend.hide" :href="friend.url" target="_blank"
                    class="relative bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl group flex flex-col w-full p-4">
                    <div class="flex items-center justify-center relative transition-all duration-300 mb-4">
                        <span
                            class="relative flex shrink-0 overflow-hidden w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 group-hover:opacity-0 transition-opacity duration-300">
                            <NuxtImg
                                class="aspect-square h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
                                :alt="friend.name" :src="friend.avatar" loading="lazy" />
                        </span>
                    </div>
                    <div class="text-center">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {{ friend.name }}
                        </h3>
                    </div>
                    <div id="friend-card-hover"
                        class="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-100 dark:bg-gray-700">
                        <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 mx-4">
                            {{ friend.name }}
                        </h3>
                        <p class="text-gray-800 dark:text-gray-600 text-base mb-4 mx-4">
                            {{ friend.description }}
                        </p>
                        <p class="text-gray-800 dark:text-gray-600 text-sm mb-4 mx-4">
                            {{ friend.url }}
                        </p>
                        <NuxtImg class="absolute inset-0 w-full h-full object-cover opacity-20" :src="friend.avatar"
                            alt="avatar_background" loading="lazy" preload />
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>