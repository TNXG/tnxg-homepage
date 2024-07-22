<template>
    <div class="container mx-auto px-4 py-12 flex flex-col items-center p-4">
        <h1 class="text-3xl font-bold mb-16 text-gray-800 dark:text-gray-200">友情链接</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            <div v-for="friend in friends" :key="friend.id" class="block" id="friend-card">
                <div v-if="!friend.hide"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                    <a :href="friend.url" target="_blank">
                        <div class="flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-700">
                            <span
                                class="relative flex shrink-0 overflow-hidden w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-200 dark:border-gray-600">
                                <img class="aspect-square h-full w-full object-cover" :alt="friend.name"
                                    :src="friend.avatar" />
                            </span>
                        </div>
                        <div class="px-6 py-4">
                            <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                <span
                                    class="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">{{ friend.name }}</span>
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">{{ friend.description }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const friends = ref(await useFetch('/api/getFriends').data);
</script>