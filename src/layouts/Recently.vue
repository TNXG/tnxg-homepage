<script setup>
import { ref } from 'vue';
import MarkdownRender from '@/components/Markdown.vue';
const recentlies = ref(useFetch('/api/getRecentlies').data);
import { SiteConfig } from '@/config';
</script>

<template>
    <div v-for="recently in recentlies" :key="recently.id" class="chat chat-start">
        <div class="chat-header">
            {{ SiteConfig.master }}
            <time class="text-xs opacity-50">{{ new Date(recently.created).toLocaleString() }}</time>
        </div>
        <div class="chat-bubble">
            <MarkdownRender :content="recently.content"></MarkdownRender>
        </div>
        <div class="chat-footer opacity-50">{{ recently.id }}
        </div>
    </div>
</template>