// blurHashStore.js
import { defineStore } from 'pinia';

export const useBlurHashStore = defineStore({
    id: 'blurHash',
    state: () => ({
        hash: '',
    }),
    actions: {
        setBlurHash(newHash) {
            this.hash = newHash;
        },
    },
});
