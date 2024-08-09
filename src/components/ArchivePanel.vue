<script setup>
import { format } from 'date-fns'
import { ref, computed } from 'vue';

const props = defineProps({
    title: String,
    created: String,
    modified: String,
    summary: String,
    cover: String,
    id: String,
    url: String,
})

const createdFormat = computed(() => format(new Date(props.created), 'MM-dd'))
const modifiedFormat = computed(() => format(new Date(props.modified), 'yyyy-MM-dd'))

const articleCard = ref(null)

function isExtLink(url) {
    return !!url?.match(':')
}

const summaryFontSize = computed(() => {
    const length = props.summary.length;
    if (length < 50) return '1rem';
    if (length < 100) return '0.875rem';
    return '0.75rem';
});
</script>

<template>
    <li class="article-line grid items-center gap-2 my-1">
        <time class="inline-block" :datetime="created">{{ createdFormat }}</time>
        <NuxtLink ref="articleCard" class="article-link gradient-card" :to="url"
            :target="isExtLink(url) ? '_blank' : undefined" :data-popover-target="`popover-${id}`">
            <span class="article-title">
                {{ title }}
            </span>
            <time v-if="modified">／Modified: {{ modifiedFormat }}</time>
            <NuxtImg v-if="cover" class="article-cover absolute top-0 right-0 h-full m-0 object-cover z-[-1]"
                :src="cover" :alt="title" />
        </NuxtLink>
        <div data-popover :id="`popover-${id}`" role="tooltip"
            class="absolute z-50 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div
                class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
            </div>
            <div class="px-3 py-2" :style="{ fontSize: summaryFontSize }">
                <p>{{ summary }}</p>
            </div>
            <div data-popper-arrow class="z-50"></div>
        </div>
    </li>
</template>

<style lang="scss" scoped>
.article-line {
    grid-template-columns: auto 1fr;
    text-shadow: 0 0 4px var(--c-bg-1);

    time {
        color: var(--c-text-3);
        transition: color 0.2s;
    }

    &:hover>time {
        color: var(--c-text-1);
    }
}

.article-link {
    overflow: hidden;
    padding: 0.3rem 0.6rem;

    &:hover {
        .article-cover {
            opacity: 1;
            width: 50%;
            object-position: center 44%;
        }
    }
}

.article-cover {
    width: min(50%, 180px);
    mask: linear-gradient(to left, white 30%, transparent);
    transition: 0.2s;
}
</style>