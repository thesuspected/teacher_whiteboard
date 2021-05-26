<template>
    <div class="d-flex flex-column justify-center align-center">
        <img src="../assets/icons/chalk-board.svg" alt="Chalkboard" height="300" />
        <div class="d-flex align-center mb-2 mt-n7">
            <h1 class="white--text ma-0 fs-main mr-4">ChalkBoard</h1>
            <v-chip
                :color="mainState.me.color"
                class="fs-sub pa-4"
                @click="$router.push('/profile')"
                style="height:40px"
                outlined
            >
                <v-icon left>
                    mdi-account
                </v-icon>
                {{ mainState.me.name }}
            </v-chip>
        </div>
        <v-list class="transparent rounded-xl pa-3 fs-main">
            <v-list-item link class="overflow-hidden rounded-xl list-item" @click="$router.push('newBoard')">
                <v-list-item-icon class="mr-3">
                    <v-icon class="fs-list white--text">mdi-clipboard-plus-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="fs-list white--text">Создать доску</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                class="list-item overflow-hidden rounded-xl"
                :disabled="mainState.currentBoard._id == ''"
                link
                @click="$router.push(`whiteboard?id=${mainState.current}`)"
            >
                <v-list-item-icon class="mr-3">
                    <v-icon class="fs-list white--text">mdi-clipboard-play-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="fs-list white--text">Активная доска</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item class="list-item overflow-hidden rounded-xl" link @click="$router.push('allBoards')">
                <v-list-item-icon class="mr-3">
                    <v-icon class="fs-list white--text">mdi-clipboard-multiple-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="fs-list white--text">Все доски ({{ boardCount }})</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { loc } from '@/store/ref/locals'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { Board, MainState } from '@/store/ref/types'
import { act } from '@/store/ref/actions'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class Home extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected boardCount = 0
    // Создание страницы
    protected created() {
        if (!localStorage.getItem(loc.USER_ID)) {
            this.$router.push('/profile')
        }
        this.getAllBoards()
        this.subscribes()
    }

    // Получение всех досок
    protected getAllBoards() {
        this.$socket.emit(act.EMIT_GET_ALL_BOARD, {}, (boards: Board[]) => {
            this.mainState.allBoards = boards
            this.boardCount = boards.length
        })
    }

    // Подписки на события
    protected subscribes() {
        this.sockets.subscribe(act.ON_ADD_BOARD, (res: { count: number; lastBoard: Board }) => {
            this.boardCount = res.count
        })
    }
}
</script>

<style lang="less">
.fill {
    height: 100%;
    width: 100%;
}
.bg-chalk {
    background: #173e23;
}
.bg-board {
    background: url(../assets/bg/board1.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.fs-main {
    font-size: 50px !important;
}
.fs-list {
    font-size: 30px !important;
    .v-label {
        font-size: 25px !important;
    }
}
.fs-sub {
    font-size: 25px !important;
}
.list-item {
    &:hover {
        transform: scale(1.1);
        div,
        i {
            color: orange !important;
        }
    }
}
.fs-list.theme--dark.v-input input,
.fs-list.theme--dark.v-input textarea {
    color: inherit !important;
}
.theme--light.v-list-item--disabled {
    opacity: 0.2;
}
* {
    font-family: 'Pangolin', cursive;
    transition: 0.2s;
}
</style>
