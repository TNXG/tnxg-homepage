<script>
import { computed } from 'vue';
import { useBlurHashStore } from '../store/blurHashStore';

export default {
    async setup() {
        let FriendData = null;
        const store = useBlurHashStore();
        const blurredImageData = computed(() => store.hash);
        try {
            let response = await fetch('https://mx.tnxg.top/api/v2/links?page=1&size=50');
            if (response.ok) {
                FriendData = await response.json();
                FriendData = FriendData.data;
            } else {
                console.error('HTTP-Error: ' + response.status);
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
        console.log(FriendData)
        return {
            FriendData, blurredImageData,
        }
    }
}
</script>

<template>
    <div class="Friends" v-if="FriendData">
    <h1 class="mt-10 z-25 text-center">我的朋友们</h1>
        <div class="Friends-items">
            <mdui-card v-for="Friend, i in FriendData" :key="Friend.name" class="Friend-item centered"
                :style="{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.8)), url(${blurredImageData})` }">
                <a class="Friend-item-link mt-2" :href="Friend.url" :title="Friend.description" alt="portrait"
                    target="_blank" rel="noopener">
                    <figure class="Friend-info mt-2 p-4">
                        <img class="Friend-avatar mt-2" loading="lazy" :src="Friend.avatar" :alt="Friend.name">
                        <figcaption class="Friend-name mt-2" :title="(i + 1).toString()">{{ Friend.name }}
                        </figcaption>
                        <figcaption class="Friend-description mt-2">{{ Friend.description }}</figcaption>
                    </figure>
                </a>
            </mdui-card>
        </div>
    </div>
</template>

<style lang="scss">
$avatar-size: 4rem;
$avatar-hover-shadow: 0 0 2rem rgba(0, 0, 0, 0.12);
$avatar-transition: 0.5s;

.centered {
    background-size: cover;
}

.Friends {
    width: 100%;
    height: auto;

    &-items {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding-left: 0;
    }
}

.Friends-number {
    color: white;
}

.Friend-item {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    width: 8rem;
    margin: 1rem;

    &__info {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    &__avatar {
        object-fit: cover;
        object-position: center top;
        width: $avatar-size;
        height: $avatar-size;
        border-radius: 50%;
        padding: 0.2rem;
        background-color: #fff;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.12);
        transition: $avatar-transition;

        &:hover {
            box-shadow: $avatar-hover-shadow;
        }
    }

    &__name {
        font-size: 0.9rem;
    }

    &__from {
        font-size: 12px;
        font-family: var(--va-font-serif);
        font-weight: bold;
        color: var(--va-c-text-light);

        &::before {
            content: '「';
        }

        &::after {
            content: '」';
        }
    }
}
</style>
