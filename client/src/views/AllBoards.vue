<template>
    <div class="d-flex flex-column justify-center align-center">
        <h1 class="white--text mb-0 fs-main mt-3">
            <v-btn icon color="white" x-large class="mr-n3" @click="$router.push('/')"><v-icon>mdi-undo</v-icon></v-btn>
            Все доски ({{ mainState.allBoards.length }})
        </h1>
        <v-text-field
            color="orange"
            dark
            v-model="search"
            append-icon="mdi-magnify"
            @input="getAllBoards()"
            label="Поиск"
            height="40px"
            class="fs-list"
            single-line
            hide-details
        ></v-text-field>
        <v-list
            three-line
            class="transparent rounded-xl pa-3 fs-main list-height"
            max-width="500"
            v-if="mainState.allBoards.length > 0"
        >
            <v-list-item
                v-for="item in mainState.allBoards"
                :key="item._id"
                link
                class="overflow-hidden rounded-xl list-item"
                @click="
                    item.password != ''
                        ? [(passwordDialog.overlay = true), (passwordDialog.board = item)]
                        : $router.push(`/whiteboard?id=${item._id}`)
                "
            >
                <v-list-item-icon class="mr-3">
                    <v-icon class="fs-list white--text">{{ boardThemes[item.subject_id].icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="fs-list white--text d-flex justify-space-between">
                        <span>
                            {{ item.name }}
                            <v-icon class="orange--text" v-if="item.is_private">mdi-lock-outline</v-icon>
                        </span>
                        <v-chip
                            :color="item.owner.color"
                            class="fs-sub pa-4"
                            style="height:40px; cursor: pointer"
                            outlined
                        >
                            <v-icon left :color="item.owner.color">
                                mdi-account
                            </v-icon>
                            {{ item.owner.name }}
                        </v-chip>
                    </v-list-item-title>
                    <v-list-item-subtitle class=" grey--text text--lighten-2 d-flex justify-space-between">
                        <span>{{ item.description }}</span>
                        <span class="text-end">{{ item.members.length }} участников</span>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <div class="list-height d-flex flex-column justify-center align-center" v-else-if="loading">
            <v-progress-circular size="40" width="5" color="white" indeterminate></v-progress-circular>
        </div>
        <div class="fs-list white--text mt-5 list-height" v-else>Досок нет</div>
        <!-- Окно ввода пароля -->
        <v-dialog v-model="passwordDialog.overlay" max-width="290">
            <v-card class="pa-4" rounded dark color="teal darken-4">
                <v-text-field
                    class="fs-list white--text mb-2"
                    :append-icon="passwordDialog.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="passwordDialog.showPassword ? 'text' : 'password'"
                    @click:append="passwordDialog.showPassword = !passwordDialog.showPassword"
                    prepend-inner-icon="mdi-lock-remove-outline"
                    dark
                    v-model="passwordDialog.password"
                    height="40px"
                    :style="'color:orange !important'"
                    label="Введите пароль"
                    hide-details
                ></v-text-field>

                <span class="fs-sub red--text" v-if="passwordDialog.wrongText">Пароль неверный</span>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="mt-2" block large outlined rounded color="white fs-list" @click="checkPassword()"
                        >Войти</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { loc } from '@/store/ref/locals'
import { mapState } from 'vuex'
import { Component, Watch } from 'vue-property-decorator'
import { Board, MainState } from '@/store/ref/types'
import { boardThemes } from '@/store/ref/enums'
import { act } from '@/store/ref/actions'
import md5 from 'md5'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class AllBoards extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected boardThemes = boardThemes
    protected search = ''
    protected loading = true
    protected passwordDialog = {
        overlay: false,
        board: {} as Board,
        showPassword: false,
        password: '',
        wrongText: false,
    }
    // Создание страницы
    protected created() {
        if (!localStorage.getItem(loc.USER_ID)) {
            this.$router.push('/profile')
        }
        this.getAllBoards()
        this.subscribes()
    }

    // Следим за состоянием окна ввода пароля
    @Watch('passwordDialog.overlay')
    onOverlayChange(newState: boolean) {
        // Если пришло состояние FALSE
        if (!newState) {
            this.passwordDialog.wrongText = false
        }
    }

    // Проверка пароля
    protected checkPassword() {
        const currPass = this.passwordDialog.board.password
        const enterPass = md5(this.passwordDialog.password + 'ziP3WyxtFi')

        this.passwordDialog.password = ''
        if (currPass == enterPass) {
            this.$router.push(`/whiteboard?id=${this.passwordDialog.board._id}`)
        } else {
            this.passwordDialog.wrongText = true
        }
    }

    // Получение всех досок
    protected getAllBoards() {
        this.$socket.emit(
            act.EMIT_GET_ALL_BOARD,
            this.search == '' ? {} : { name: { $regex: `^.*?${this.search}.*?$`, $options: 'i' } },
            (boards: Board[]) => {
                // localStorage.setItem(loc.USER_LAST_BOARD_ID, res.id)
                // localStorage.setItem(loc.USER_LAST_BOARD_ROLE, 'owner')
                this.mainState.allBoards = boards
                this.loading = false
            }
        )
    }

    // Подписки на события
    protected subscribes() {
        this.sockets.subscribe(act.ON_ADD_BOARD, (res: { count: number; lastBoard: Board }) => {
            this.mainState.allBoards.unshift(res.lastBoard)
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
* {
    font-family: 'Pangolin', cursive;
    transition: 0.2s;
}
.list-height {
    min-height: calc(100vh - 130px);
}
</style>
