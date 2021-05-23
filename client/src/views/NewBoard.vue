<template>
    <div class="fill d-flex flex-column justify-center align-center blue-grey lighten-5">
        <h1 class="dark--text mb-2">Создать доску</h1>
        <v-card class="pa-4">
            <v-subheader>Вы</v-subheader>
            <v-text-field v-model="newBoard.user.firstname" label="Имя" hide-details required></v-text-field>
            <v-text-field v-model="newBoard.user.lastname" label="Фамилия" required></v-text-field>

            <v-subheader>Доска</v-subheader>
            <v-text-field v-model="newBoard.board.name" label="Название" hide-details required></v-text-field>
            <v-text-field v-model="newBoard.board.description" label="Описание" required></v-text-field>
        </v-card>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { Component } from 'vue-property-decorator'

@Component({})
export default class NewBoard extends App {
    protected newBoard = {
        user: {
            firstname: '',
            lastname: '',
        },
        board: {
            name: '',
            description: '',
        },
    }

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
