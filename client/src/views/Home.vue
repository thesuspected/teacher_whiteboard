<template>
    <div class="fill d-flex flex-column justify-center align-center blue-grey lighten-5">
        <h1 class="dark--text mb-2">Whiteboard</h1>
        <v-list class=" rounded-xl pa-3">
            <v-subheader>Выберите действие</v-subheader>
            <v-list-item link @click="$router.push('newBoard')">
                <v-list-item-icon class="mr-3">
                    <v-icon>mdi-clipboard-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Создать новую</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon class="mr-3">
                    <v-icon>mdi-clipboard-multiple-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Все доски</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { Component } from 'vue-property-decorator'

@Component({})
export default class Home extends App {
    protected id = '1'

    // Создание страницы
    protected created() {
        this.subscribes()
    }

    // Подписки на события
    protected subscribes() {
        this.sockets.subscribe('USER_CONNECTED', (id: string) => {
            console.log(id, '2')
            this.id = id
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
