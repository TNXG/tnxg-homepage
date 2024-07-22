<script setup>
import Friends from '@/layouts/Friends.vue'
import { SiteConfig, SidebarConfig } from '@/config'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute();
const currentPath = route.path;

const PageName = computed(() => {
    const entry = SidebarConfig.sections.find((entry) => entry.path === currentPath);
    return entry ? `${entry.name} - ${SiteConfig.title}` : SiteConfig.title;
});

useSeoMeta({
    title: PageName.value,
    ogTitle: SiteConfig.title,
    description: SiteConfig.description,
})
</script>

<template>
    <Friends />
</template>