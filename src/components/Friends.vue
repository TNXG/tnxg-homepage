<script>
export default {
    async setup() {
        let FriendData = null;
        try {
            let response = await fetch('https://mx.tnxg.top/api/v2/links');
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
            FriendData,
        }
    }
}
</script>
<template>
    <div class="Friends" v-if="FriendData">
        <h1 class="mt-2">我的朋友们</h1>
        <ul class="Friend-items">
            <li v-for="Friend, i in FriendData" :key="Friend.name"
                class="Friend-item border-4 border-white rounded bg-transparent">
                <a class="Friend-item-link mt-2" :href="Friend.url" :title="Friend.description" alt="portrait"
                    target="_blank" rel="noopener">
                    <figure class="Friend-info mt-2 p-4">
                        <img class="Friend-avatar mt-2" loading="lazy" :src="Friend.avatar" :alt="Friend.name">
                        <figcaption class="Friend-name mt-2" :title="(i + 1).toString()">{{ Friend.name }}</figcaption>
                        <figcaption class="Friend-description mt-2">{{ Friend.description }}</figcaption>
                    </figure>
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
$avatar-size: 4rem;
$avatar-hover-shadow: 0 0 2rem rgba(0, 0, 0, 0.12);
$avatar-transition: 0.5s;

.Friends {
    text-align: center;

    &__items {
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