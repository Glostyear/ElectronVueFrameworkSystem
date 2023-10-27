import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
    state: () => {
    return {
        num: 200,
    }
    },
    getters:{},
    actions:{}
})