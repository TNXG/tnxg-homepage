<script setup>
// 导入必要的模块和类型
import { group } from 'radash'
import { computed, ref } from 'vue'
import ArchivePanel from '@/components/ArchivePanel.vue'

// 初始化数据
const data = ref(await $fetch('/api/getArchiveinfo'))

// 计算排序后的列表
const list = computed(() => data.value.slice().sort(
    (a, b) => b['created'].localeCompare(a['created'])
))

// 计算按年份分组的列表
const groupedList = computed(
    () => Object.entries(group(
        list.value,
        article => new Date(article['created']).getFullYear()
    )).reverse()
)
</script>

<template>
    <div class="w-full flex justify-start mb-6">
        <h1 class="absolute text-4xl m-6"><mark class="line">归档</mark></h1>
    </div>
    <div class="relative">
        <div class="flex justify-center">
            <div class="md:w-full lg:w-1/2">
                <div class="archive m-4">
                    <!-- 按年份分组显示文章 -->
                    <div v-for="[year, yearGroup] in groupedList" :key="year" class="archive-group">
                        <h2
                            class="archive-year sticky top-0 opacity-50 -mb-8 text-8xl text-transparent -z-[1] font-bold my-4">
                            {{ year }}
                            <span class="absolute right-0">{{ yearGroup?.length }}</span>
                        </h2>
                        <ul class="archive-list">
                            <ArchivePanel v-for="article in yearGroup" :key="article.id" v-bind="article"
                                :to="article.url" />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.archive {
    mask: linear-gradient(var(--c-bg-1) 50%, #fff);
}

.archive-group {
    margin: 1rem 0;
}

.archive-group:hover>.archive-year {
    color: var(--c-text-3);
}

.archive-year {
    mask: linear-gradient(var(--c-bg-1) 50%, transparent);
    transition: color 0.2s;
    -webkit-text-stroke: 1px var(--c-text-3);
}
</style>