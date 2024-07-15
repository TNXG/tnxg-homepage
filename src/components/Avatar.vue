<template>
    <div :class="['avatar', { online: isOnline }, { offline: !isOnline }]">
        <div class="w-24 rounded-full">
            <img src="https://api-space.tnxg.top/avatar?s=qq" alt="Active_Avatar" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOnline: {
            type: Boolean,
            default: false
        }
    }
}
</script>