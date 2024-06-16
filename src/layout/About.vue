<!-- src/components/ExternalPage.vue -->
<template>
    <div class="iframe-container">
        <iframe :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: 'https://tnxgmoe.com/about-me'
        }
    }
}
</script>

<style>
.iframe-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.iframe-container iframe {
    width: 100%;
    height: 100%;
}
</style>