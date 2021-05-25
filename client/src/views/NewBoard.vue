<template>
    <div class="d-flex flex-column justify-center align-center">
        <h1 class="white--text mb-0 fs-main">
            <v-btn icon color="white" x-large class="mr-n3" @click="$router.push('/')"><v-icon>mdi-undo</v-icon></v-btn>
            Создать доску
        </h1>
        <v-card class="pa-4 transparent" flat max-width="400px">
            <v-text-field
                class="fs-list white--text mb-3"
                prepend-inner-icon="mdi-format-text"
                dark
                v-model="newBoard.name"
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
                v-model="newBoard.description"
                :rules="[(v) => !!v || 'Заполните Описание']"
                label="Описание"
                rows="1"
                :style="'color:orange !important'"
                auto-grow
                hide-details
                required
            ></v-textarea>
            <span class="subheading grey--text text--lighten-2 fs-sub">Тематика</span>

            <v-chip-group v-model="newBoard.subject_id" active-class="orange--text orange-border" mandatory column>
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
                v-model="newBoard.is_private"
                dark
                color="orange"
                label="Приватная доска"
                class="fs-list mb-3"
                hide-details
            ></v-checkbox>

            <v-slide-y-transition>
                <v-text-field
                    v-if="newBoard.is_private"
                    class="fs-list white--text mb-5"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    prepend-inner-icon="mdi-lock-remove-outline"
                    dark
                    v-model="newBoard.password"
                    height="40px"
                    :style="'color:orange !important'"
                    label="Пароль"
                    hide-details
                ></v-text-field>
            </v-slide-y-transition>

            <v-btn class="mt-4" block large outlined rounded color="white fs-list" @click="createBoard()"
                >Создать</v-btn
            >
        </v-card>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { boardThemes, colors } from '@/store/ref/enums'
import { MainState } from '@/store/ref/types'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import { act } from '@/store/ref/actions'
import { loc } from '@/store/ref/locals'
import md5 from 'md5'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class NewBoard extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected boardThemes = boardThemes
    protected colors = colors
    protected selection = 0
    protected showPassword = false
    protected newBoard = {
        name: '',
        description: '',
        subject_id: 0,
        is_private: false,
        password: '',
        owner: {},
        members: [],
    }

    // Создание страницы
    protected created() {
        if (!localStorage.getItem(loc.USER_ID)) {
            this.$router.push('/profile')
        }
        this.subscribes()
    }

    // Создание доски
    protected createBoard() {
        if (this.newBoard.name != '' && this.newBoard.description != '') {
            this.newBoard.owner = this.mainState.me
            if (this.newBoard.password != '') {
                this.newBoard.password = md5(this.newBoard.password + 'ziP3WyxtFi')
            }
            this.$socket.emit(act.EMIT_ADD_BOARD, this.newBoard, (res: { id: string }) => {
                localStorage.setItem(loc.USER_LAST_BOARD_ID, res.id)
                localStorage.setItem(loc.USER_LAST_BOARD_ROLE, 'owner')
                this.$router.push(`/whiteboard?id=${res.id}&role=owner`)
            })
        }
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
