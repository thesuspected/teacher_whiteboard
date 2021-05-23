<template>
    <WhiteBoardComponent />
</template>

<script lang="ts">
import App from '@/App.vue'
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
