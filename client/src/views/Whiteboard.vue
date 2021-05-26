<template>
    <div class="fill">
        <!-- Область роутинга -->
        <v-main class="green-bg" style="padding-bottom:56px">
            <v-scroll-y-transition leave-absolute hide-on-leave>
                <router-view />
            </v-scroll-y-transition>
        </v-main>
        <!-- Роутинг -->
        <v-bottom-navigation
            scroll-target="body"
            fixed
            color="teal"
            grow
            mandatory
            v-model="selected"
            class="rounded-t-lg overflow-hidden z-index-1000"
        >
            <v-btn v-for="item in menu" :key="item.id" link @click="push(item.route)" class="mobile-nav-btn">
                <span>{{ item.title }}</span>
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { loc } from '@/store/ref/locals'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { Board, MainState, User } from '@/store/ref/types'
import { act } from '@/store/ref/actions'
import Event, { EventNames } from '@/events/events'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class WhiteBoard extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected currBoardId = localStorage.getItem(loc.USER_LAST_BOARD_ID)
    protected selected = 1
    protected menu = [
        {
            id: 1,
            title: 'Доска',
            route: '/whiteboard/draw',
            icon: 'mdi-draw',
        },
        {
            id: 2,
            title: 'Участники',
            route: '/whiteboard/members',
            icon: 'mdi-account',
        },
        {
            id: 3,
            title: 'Настройки',
            route: '/whiteboard/settings',
            icon: 'mdi-cog',
        },
    ]

    // Создание страницы
    protected created() {
        if (!localStorage.getItem(loc.USER_ID)) {
            this.$router.push('/profile')
        }
        this.getCurrBoard()
        this.subscribes()

        Event.$on(EventNames.ON_GET_BOARDS, this.getCurrBoard)
    }

    protected mounted() {
        // Селектим открытую вкладку
        this.selected = this.menu.findIndex((item: Record<string, any>) => item.route === document.location.pathname)
    }

    protected push(route: string) {
        if (document.location.pathname != route) {
            this.$router.push(route)
        }
    }

    // Получение текущей доски
    protected getCurrBoard() {
        this.$socket.emit(act.EMIT_GET_ALL_BOARD, { _id: this.currBoardId }, (boards: Board[]) => {
            this.mainState.currentBoard = boards[0]
            this.checkUser()
            this.mainState.currentBoard.members.forEach((v) => {
                v.canvas = this.svgToImg(v.canvas)
            })
        })
    }

    protected svgToImg(svgelement: string): string {
        const div = document.createElement('div')
        div.innerHTML = svgelement
        const svg = div.children[0]

        if (div && svg) {
            const XML = new XMLSerializer().serializeToString(svg)
            const SVG64 = btoa(XML)
            return String('data:image/svg+xml;base64,' + SVG64)
        }
        return ''
    }

    // Проверка пользователя
    protected checkUser() {
        if (this.mainState.currentBoard.owner._id != this.mainState.me._id) {
            const find = this.mainState.currentBoard.members.find((v: User) => v._id == this.mainState.me._id)
            console.log(find)
            if (find) {
                console.log('find')
            } else {
                const users_id = []
                this.mainState.currentBoard.members.forEach((v) => {
                    users_id.push(v._id)
                })
                users_id.push(this.mainState.me._id)
                const board = Object.assign({}, this.mainState.currentBoard) as any
                board.members = users_id
                board.owner = board.owner._id
                this.editBoard(board)
            }
            Event.$emit(EventNames.ON_GET_BOARDS)
        }
    }

    // Изменение доски
    protected editBoard(board: any) {
        this.$socket.emit(act.EMIT_EDIT_BOARD, board, () => {
            console.log('board edited')
        })
    }

    // Подписки на события
    protected subscribes() {
        this.sockets.subscribe(act.ON_EDIT_USER, this.getCurrBoard)
    }
}
</script>

<style lang="less">
.fill {
    height: 100%;
    width: 100%;
}
.z-index-1000 {
    z-index: 1000 !important;
}
.mobile-nav-btn {
    min-width: 60px !important;
}
</style>
