<script setup>
import { SiteConfig, SidebarConfig } from '@/config'
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'

import Friends from '@/layouts/Friends.vue';
import Loading from '@/components/Loading.vue';

const friends = ref([]);
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
    friends.value = await $fetch('/api/getFriends');
    isLoading.value = false;
});
</script>

<template>
    <Loading v-if="isLoading" />
    <Friends v-else :friends="friends" />
</template>