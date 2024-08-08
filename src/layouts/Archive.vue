<script setup>
// 导入必要的模块和类型
import { group } from 'radash'
import { computed, ref } from 'vue'
import ArchiveOrderToggle from '@/components/ArchiveOrderToggle.vue'
import ArchivePanel from '@/components/ArchivePanel.vue'
import { useRoute } from 'vue-router'

// 使用 useRoute 获取当前路由实例
const route = useRoute()
// 获取路由查询参数，默认为配置中的排序方式或 'created'
const orderBy = ref(route.query.order || 'created')


// 初始化数据
const data = ref(await $fetch('/api/getArchiveinfo'))

// 计算排序后的列表
const list = computed(() => data.value.slice().sort(
    (a, b) => b[orderBy.value].localeCompare(a[orderBy.value])
))

// 计算按年份分组的列表
const groupedList = computed(
    () => Object.entries(group(
        list.value,
        article => new Date(article[orderBy.value]).getFullYear()
    )).reverse()
)
</script>

<template>
    <div class="archive m-4">
        <!-- 排序切换组件 -->
        <ArchiveOrderToggle v-model="orderBy" />
        <!-- 按年份分组显示文章 -->
        <div v-for="[year, yearGroup] in groupedList" :key="year" class="archive-group">
            <h2 class="archive-year sticky top-0 opacity-50 -mb-8 text-6xl text-transparent -z-[1]">
                {{ year }}
                <span class="absolute right-0">{{ yearGroup?.length }}</span>
            </h2>
            <ul class="archive-list">
                <ArchivePanel v-for="article in yearGroup" :key="article.id" v-bind="article" :to="article.url"
                    :use-updated="orderBy === 'updated'" />
            </ul>
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