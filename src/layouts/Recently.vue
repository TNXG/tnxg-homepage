<script setup>
import { SiteConfig } from '@/config';

const props = defineProps({
    recentlies: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <div class="w-full flex justify-start mb-6">
        <h1 class="absolute text-4xl m-6"><mark class="line">动态</mark></h1>
    </div>
    <div class="mt-20">
        <div v-for="recently in recentlies" :key="recently.id" class="chat chat-start">
            <div class="chat-header">
                {{ SiteConfig.master }}
                <time class="text-xs opacity-50">{{ new Date(recently.created).toLocaleString() }}</time>
            </div>
            <div class="chat-bubble">
                <MDC :value="recently.content" tag="article" />
            </div>
            <div class="chat-footer opacity-50">{{ recently.id }}
            </div>
        </div>
    </div>
</template>