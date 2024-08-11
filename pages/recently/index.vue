<script setup>
import { SiteConfig, SidebarConfig } from '@/config'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

import Recently from '@/layouts/Recently.vue';
import Loading from '@/components/Loading.vue';

const recentlies = ref([]);
const isLoading = ref(true);

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
    recentlies.value = await $fetch('/api/getRecentlies');
    isLoading.value = false;
});

</script>

<template>
    <Loading v-if="isLoading" />
    <Recently v-else :recentlies="recentlies" />
</template>