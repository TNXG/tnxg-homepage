<script>
import Friends from '@/components/Friends.vue';

export default {

    components: {
        Friends,
    },
};
</script>

<template>
    <div class="FriendsList">
        <Suspense>
            <template #default>
                <Friends />
            </template>
            <template #fallback>
                <div></div>
            </template>
        </Suspense>
    </div>
</template>
<style scoped>
@font-face {
    src: url("https://cdn.tnxg.top/fonts/moonbridge.woff2") format('woff2');
    font-family: "moonbridge";
}

*:not(mdui-icon) {
    font-family: "moonbridge";
}
</style>