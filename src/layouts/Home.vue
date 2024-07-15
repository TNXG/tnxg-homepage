<template>
    <div class="flex flex-col md:flex-row items-start justify-center mx-auto px-4 py-8 pt-16">
        <div class="avatar">
            <div class="mask mask-squircle w-24 -z-10">
                <img src="https://api-space.tnxg.top/avatar?s=qq" class="w-24 h-24 object-cover" alt="avatar" />
            </div>
        </div>
        <div class="ml-0 md:ml-4 mt-4 md:mt-0">
            <h1 class="text-6xl font-bold">Hello</h1>
            <div class="flex items-center space-x-2">
                <h2 class="text-5xl font-bold mt-4">I'm</h2>
                <h2 class="text-5xl font-bold text-[#007acc] mt-4">
                    <sup class="text-xs -z-10">いゆくるず iykrzu</sup><br>天翔TNXG
                </h2>
                <span class="text-2xl font-medium">TiaNXianG</span>
            </div>
            <br />
            <p class="text-xl mt-2">明日尚未到来，希望凝于心上</p>
            <div class="flex flex-wrap items-center gap-12 mt-4 mb-4">
                <div class="text-gray-600">
                    <a href="https://tnxgmoe.com" role="button" class="btn mt-4 mb-2">
                        <Icon name="fa6-solid:blog" />Blog
                    </a>&nbsp;
                    <a href="https://github.com/TNXG" role="button" class="btn mt-4 mb-2">
                        <Icon name="ri:github-line" />Github
                    </a>&nbsp;
                    <a href="https://github.com/TNXG" role="button" class="btn mt-4 mb-2">
                        <Icon name="ri-twitter-line" />twitter
                    </a>&nbsp;
                    <a href="https://github.com/TNXG" role="button" class="btn mt-4 mb-2">
                        <Icon name="ri-telegram-line" />Telegram
                    </a>
                </div>
            </div>
        </div>
        <div id="background" class="absolute bottom-0 right-0 w-1/4 h-full bg-cover bg-no-repeat bg-center -z-10"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        const images = [
            "https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
        ];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.getElementById('background').style.backgroundImage = `url(${randomImage})`;
    }
}
</script>

<style scoped>
@font-face {
    src: url("https://cdn.tnxg.top/fonts/moonbridge.woff2") format('woff2');
    font-family: "moonbridge";
}

* {
    font-family: "moonbridge";
}
</style>
