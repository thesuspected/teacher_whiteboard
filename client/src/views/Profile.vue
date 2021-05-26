<template>
    <div class="d-flex flex-column justify-center align-center">
        <h1 class="white--text mb-2 fs-main" v-if="is_user_registered">
            <v-btn icon color="white" x-large class="mr-n3" @click="$router.push('/')"><v-icon>mdi-undo</v-icon></v-btn>
            Профиль
        </h1>
        <div v-else class="d-flex flex-column align-center">
            <img src="../assets/icons/chalk-board.svg" alt="Chalkboard" height="300" />
            <h1 class="white--text ma-0 fs-main text-center mt-n7">ChalkBoard</h1>
            <p class="ma-0 grey--text text--lighten-1 text-center fs-sub">Добро пожаловать на доску для</p>
            <v-chip-group active-class="orange--text orange-border" mandatory column>
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
        </div>
        <v-card class="pa-4 transparent" flat max-width="300px">
            <div class="d-flex align-center">
                <v-text-field
                    class="fs-list white--text mb-3"
                    dark
                    height="40px"
                    prepend-inner-icon="mdi-account"
                    label="Ваше Имя"
                    autofocus
                    v-model="mainState.me.name"
                    :rules="[(v) => !!v || 'Заполните Имя']"
                    :style="'color:' + mainState.me.color + '!important'"
                    hide-details
                    required
                ></v-text-field>
                <v-menu offset-x transition="slide-y-reverse-transition" :close-on-content-click="false">
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn icon class="color-icon" color="white" v-bind="attrs" v-on="on">
                            <v-icon>
                                mdi-format-color-fill
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card class="d-flex flex-column overflow-hidden">
                        <v-color-picker
                            v-model="mainState.me.color"
                            class="mt-2 mx-2 mb-n1"
                            :swatches="colors"
                            show-swatches
                            hide-sliders
                            hide-canvas
                            hide-inputs
                            swatches-max-height="175"
                        ></v-color-picker>
                    </v-card>
                </v-menu>
            </div>

            <v-btn
                class="mt-4"
                block
                large
                outlined
                rounded
                color="white fs-list"
                @click="is_user_registered ? editUser() : addUser()"
                >{{ is_user_registered ? 'Изменить' : 'Войти' }}</v-btn
            >
        </v-card>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { boardThemes2, colors } from '@/store/ref/enums'
import { MainState } from '@/store/ref/types'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { act } from '@/store/ref/actions'
import { loc } from '@/store/ref/locals'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class Profile extends App {
    protected is_user_registered = localStorage.getItem(loc.USER_ID) ? true : false

    // Хранилище состояния
    protected mainState!: MainState
    protected boardThemes = boardThemes2
    protected colors = colors
    protected selection = 0

    // Создание страницы
    protected created() {
        this.subscribes()
    }

    // Создание пользователя
    protected addUser() {
        if (this.mainState.me.name != '') {
            console.log(this.mainState.me)
            this.$socket.emit(act.EMIT_ADD_USER, this.mainState.me, (res: { id: string }) => {
                this.editLocalStorage(res.id)
                this.$router.push('/')
            })
        }
    }

    // Изменение пользователя
    protected editUser() {
        if (this.mainState.me.name != '') {
            console.log(this.mainState.me)
            this.$socket.emit(act.EMIT_EDIT_USER, this.mainState.me, () => {
                this.editLocalStorage()
                this.$router.push('/')
            })
        }
    }

    // Перезапись localStorage
    protected editLocalStorage(id = String(this.mainState.me._id)) {
        localStorage.setItem(loc.USER_ID, id)
        localStorage.setItem(loc.USER_NAME, this.mainState.me.name)
        localStorage.setItem(loc.USER_COLOR, this.mainState.me.color)
        this.mainState.me._id = id
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
.text-min-height {
    .v-input__slot {
        min-height: 40px;
    }
}
.orange-border {
    border-color: orange !important;
}
.not-active:not(.v-chip--active) {
    border-color: rgb(201, 201, 201) !important;
    color: rgb(201, 201, 201) !important;
}
.color-icon {
    position: absolute !important;
    right: 20px;
}
</style>
