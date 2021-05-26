<template>
    <div class="fill" v-if="mainState.currentBoard.name == ''">
        <div class="fill-height d-flex flex-column justify-center align-center">
            <v-progress-circular size="40" width="5" color="white" indeterminate></v-progress-circular>
        </div>
    </div>
    <div class="fill" v-else>
        <div class="d-flex flex-wrap flex-grow-1">
            <v-col
                cols="12"
                md="6"
                lg="4"
                class="px-2 transition-fast-in-fast-out"
                v-for="item in mainState.currentBoard.members"
                :key="item._id"
            >
                <div class="members-card">
                    <!-- <span class="white--text fs-sub card-text">{{ item.name }}</span> -->
                    <v-chip :color="item.color" class="fs-sub pa-4 card-text" style="height:40px" outlined>
                        <v-icon left>
                            mdi-account
                        </v-icon>
                        {{ item.name }}
                    </v-chip>
                    <img v-if="item.canvas != ''" :src="item.canvas" alt="Холст" style="width:100%;" />
                    <div v-else class="fill d-flex align-center justify-center" style="min-height:300px">
                        <span class="orange--text fs-sub">Пусто</span>
                    </div>
                </div>
            </v-col>
        </div>
    </div>
</template>

<script lang="ts">
import App from '@/App.vue'
import { MainState, User } from '@/store/ref/types'
import { mapState } from 'vuex'
import { Component } from 'vue-property-decorator'
import Event, { EventNames } from '@/events/events'

@Component({
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class Members extends App {
    // Хранилище состояния
    protected mainState!: MainState

    protected created() {
        Event.$emit(EventNames.ON_GET_BOARDS)
    }

    // // Подписки на события
    // protected subscribes() {
    //     this.sockets.subscribe(act.ON_EDIT_USER, () => {
    //         console.log()
    //     })
    // }
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
.members-card {
    border: 1px white solid;
    border-radius: 15px;
    position: relative;
    .card-text {
        position: absolute;
        right: 10px;
        top: 10px;
    }
}
</style>
