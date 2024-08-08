<script setup>
const orderMap = {
    created: '创建日期',
    modified: '更新日期',
    // title: '标题',
}

const orderBy = defineModel({
    required: true,
    default: 'created',
})

function switchOrder() {
    const orderKeys = Object.keys(orderMap)
    const currentIndex = orderKeys.indexOf(orderBy.value)
    orderBy.value = orderKeys[(currentIndex + 1) % orderKeys.length]
}
</script>

<template>
    <div class="order-toggle flex items-center justify-end">
        <button @click="switchOrder" class="flex items-center cursor-pointer">
            <Icon name="ph:sort-ascending-bold" />
            <span class="order-text">{{ orderMap[orderBy] }}</span>
        </button>
    </div>
</template>

<style scoped>
.order-toggle {
    margin-block: 1rem;
}

.order-toggle>button {
    gap: 0.2rem;
    color: var(--c-text-3);
    transition: color 0.1s;
}

.order-toggle>button:hover {
    color: var(--c-primary-1);
}
</style>