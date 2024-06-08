<script>

export default {
    async setup() {
        let songInfo = await fetch('https://mx.tnxg.top/api/v2/fn/ps/update', {
            method: 'POST',
        });
        songInfo = await songInfo.json();
        let returnappdesc;
        if (songInfo && songInfo.processName) {
            const endponit = "https://jsd.onmicrosoft.cn/gh/Innei/reporter-assets@main"
            let appicon = await fetch(`${endponit}/app-icon.json`);
            appicon = await appicon.json();
            let appdesc = await fetch(`${endponit}/app-desc.json`);
            appdesc = await appdesc.json();

            try {
                returnappdesc = appdesc[songInfo.processName]
            } catch (error) {
                return
            };
        }
        return {
            returnappdesc,
            songInfo,
        }
    }
}
</script>

<template>
    <div v-if="songInfo && songInfo.processName">
        <div class="ml-4">
            <mdui-divider vertical middle></mdui-divider>
            <div class="song-info-container">
                <div class="app-info">
                    <h2 class="text-2xl mb-4">应用信息</h2>
                    <p>Master 正在使用 <b>{{ songInfo.processName }}</b> {{ returnappdesc }}</p>
                </div>
                <div v-if="songInfo.mediaInfo" class="media-info mt-6">
                    <mdui-divider middle></mdui-divider>
                    <h2 class="text-2xl mb-4 mt-6">媒体信息</h2>
                    <p class="mt-2">Master 正在听: {{ songInfo.mediaInfo.title }}</p>
                    <p class="mt-2">艺术家: {{ songInfo.mediaInfo.artist }}</p>
                    <p class="mt-2">来源应用名: {{ songInfo.mediaInfo.SourceAppName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
p {
    max-width: 300px;
    overflow-wrap: break-word;
}
</style>