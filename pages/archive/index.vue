<script setup>
import { computed } from 'vue'
import { SiteConfig, SidebarConfig } from '@/config'
import { useRoute } from 'vue-router'

import Archive from '@/layouts/Archive.vue'

// 设置页面标题
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
    <div class="flex justify-center">
        <div class="w-1/2">
            <Archive />
        </div>
    </div>
</template>