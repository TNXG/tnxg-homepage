<script setup>
import { computed, onMounted, ref } from 'vue'
import { SiteConfig, SidebarConfig } from '@/config'
import { useRoute } from 'vue-router'

import Archive from '@/layouts/Archive.vue';
import Loading from '@/components/Loading.vue';

const data = ref([]);
const isLoading = ref(true);

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

onMounted(async () => {
    data.value = await $fetch('/api/getArchiveinfo')
    isLoading.value = false;
})

</script>

<template>
    <Loading v-if="isLoading" />
    <Archive v-else :data="data" />
</template>