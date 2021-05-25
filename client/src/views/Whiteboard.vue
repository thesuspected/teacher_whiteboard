<template>
    <WhiteBoardComponent />
</template>

<script lang="ts">
import App from '@/App.vue'
import { loc } from '@/store/ref/locals'
import { Component } from 'vue-property-decorator'
import WhiteBoardComponent from '../components/WhiteBoard.vue'

@Component({
    components: {
        WhiteBoardComponent,
    },
})
export default class WhiteBoard extends App {
    // Создание страницы
    protected created() {
        if (!localStorage.getItem(loc.USER_ID)) {
            this.$router.push('/profile')
        }
        this.subscribes()
    }

    // Подписки на события
    protected subscribes() {
        this.sockets.subscribe('USER_CONNECTED', (id: string) => {
            console.log(id, '2')
        })
    }
}
</script>

<style lang="less">
.fill {
    height: 100%;
    width: 100%;
}
</style>
