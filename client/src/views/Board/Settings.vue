<template>
    <div class="fill" v-if="mainState.currentBoard.name == ''">
        <div class="fill-height d-flex flex-column justify-center align-center">
            <v-progress-circular size="40" width="5" color="white" indeterminate></v-progress-circular>
        </div>
    </div>
    <div class="d-flex flex-column justify-center align-center fill" v-else>
        <h1 class="white--text mb-0 fs-main">
            <v-btn icon color="white" x-large class="mr-n3" @click="$router.push('/')"><v-icon>mdi-home</v-icon></v-btn>
            Текущая доска
        </h1>
        <v-card class="pa-4 transparent" flat max-width="400px">
            <v-text-field
                class="fs-list white--text mb-3"
                prepend-inner-icon="mdi-format-text"
                dark
                v-model="mainState.currentBoard.name"
                :rules="[(v) => !!v || 'Заполните Название']"
                height="40px"
                :style="'color:orange !important'"
                label="Название"
                hide-details
                required
            ></v-text-field>
            <v-textarea
                class="fs-list white--text mb-5 text-min-height"
                prepend-inner-icon="mdi-text"
                dark
                v-model="mainState.currentBoard.description"
                :rules="[(v) => !!v || 'Заполните Описание']"
                label="Описание"
                rows="1"
                :style="'color:orange !important'"
                auto-grow
                hide-details
                required
            ></v-textarea>
            <span class="subheading grey--text text--lighten-2 fs-sub">Тематика</span>

            <v-chip-group
                v-model="mainState.currentBoard.subject_id"
                active-class="orange--text orange-border"
                mandatory
                column
            >
                <v-chip
                    v-for="(item, key) in boardThemes"
                    :key="key"
                    :value="item.key"
                    color="not-active"
                    class="fs-sub pa-4"
                    style="height:40px"
                    outlined
                >
                    <v-icon left>
                        {{ item.icon }}
                    </v-icon>
                    {{ item.name }}
                </v-chip>
            </v-chip-group>

            <v-checkbox
                v-model="mainState.currentBoard.is_private"
                dark
                color="orange"
                label="Приватная доска"
                class="fs-list mb-3"
                hide-details
            ></v-checkbox>

            <v-slide-y-transition>
                <v-text-field
                    v-if="mainState.currentBoard.is_private"
                    class="fs-list white--text mb-5"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    prepend-inner-icon="mdi-lock-remove-outline"
                    dark
                    v-model="mainState.currentBoard.password"
                    height="40px"
                    :style="'color:orange !important'"
                    label="Новый пароль"
                    hide-details
                ></v-text-field>
            </v-slide-y-transition>

            <v-btn class="mt-4" block large outlined rounded color="white fs-list" @click="editBoard()"
                >Сохранить</v-btn
            >

            <p class="orange--text text-center" v-if="editText">Изменения успешно сохранены</p>
        </v-card>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { Board, MainState } from '@/store/ref/types'
import { boardThemes } from '@/store/ref/enums'
import { loc } from '@/store/ref/locals'
import { act } from '@/store/ref/actions'
import md5 from 'md5'
import Event, { EventNames } from '@/events/events'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class Settings extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected boardThemes = boardThemes
    protected loading = true
    protected showPassword = false
    protected editText = false
    protected currBoardId = localStorage.getItem(loc.USER_LAST_BOARD_ID)

    protected created() {
        // this.getCurrBoard()
        // console.log(this.mainState.currentBoard._id)
        // Event.$on(EventNames.ON_GET_BOARDS, () => {
        //     this.loading = false
        // })
    }

    protected beforeDesctroy() {
        // Event.$off(EventNames.ON_GET_BOARDS)
    }

    // Изменение доски
    protected editBoard() {
        if (this.mainState.currentBoard.name != '' && this.mainState.currentBoard.description != '') {
            if (this.mainState.currentBoard.password != '') {
                this.mainState.currentBoard.password = md5(this.mainState.currentBoard.password + 'ziP3WyxtFi')
            }
            this.$socket.emit(act.EMIT_EDIT_BOARD, this.mainState.currentBoard, () => {
                this.mainState.currentBoard.password = ''
                this.editText = true
            })
        }
    }

    // Получение текущей доски
    protected getCurrBoard() {
        this.$socket.emit(act.EMIT_GET_ALL_BOARD, { _id: this.currBoardId }, (boards: Board[]) => {
            this.mainState.currentBoard = boards[0]
            this.mainState.currentBoard.password = ''
            this.loading = false

            // TODO: Починить проверку (промисы работают неправильно на бэке)
            // if (this.mainState.me._id != this.mainState.currentBoard.owner._id) {
            //     this.$router.push('/whiteboard')
            // }
        })
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
