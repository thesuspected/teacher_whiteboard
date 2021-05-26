<template>
    <div class="fill-56px">
        <div class="fill-height d-flex flex-column justify-center align-center" v-if="loading">
            <v-progress-circular size="40" width="5" color="white" indeterminate></v-progress-circular>
        </div>
        <canvas id="whiteboard" resize></canvas>
        <MainPanel></MainPanel>
        <HistoryPanel></HistoryPanel>
    </div>
</template>

<script lang="ts">
import paper from 'paper'
import MainPanel from '../../components/panel/MainPanel.vue'
import HistoryPanel from '../../components/panel/HistoryPanel.vue'
import history from '../../tools/history'
import { mapState } from 'vuex'
import App from '@/App.vue'
import { Component } from 'vue-property-decorator'
import { loc } from '@/store/ref/locals'
import Event, { EventNames } from '@/events/events'
import { Board, MainState, User } from '@/store/ref/types'
import { act } from '@/store/ref/actions'

@Component({
    components: {
        MainPanel,
        HistoryPanel,
    },
    computed: {
        ...mapState({
            mainState: (state: any) => state,
        }),
    },
})
export default class Draw extends App {
    // Хранилище состояния
    protected mainState!: MainState
    protected currBoardId = localStorage.getItem(loc.USER_LAST_BOARD_ID)
    protected loading = true

    // Создание страницы
    protected created() {
        paper.install(window)
        document.addEventListener('keyup', this.keyupHandler)

        this.subscribes()
        this.getCurrBoard()

        // Ловим событие сохранения холста
        Event.$on(EventNames.ON_CANVAS_SAVE, this.saveCanvas)
    }

    protected mounted() {
        paper.setup('whiteboard')
        paper.project.importSVG(localStorage.getItem(loc.USER_CANVAS))
    }

    protected destroyed() {
        document.removeEventListener('keyup', this.keyupHandler)
    }

    protected saveCanvas() {
        const svg = paper.project.exportSVG({ asString: true })
        localStorage.setItem(loc.USER_CANVAS, svg)
        this.mainState.me.canvas = svg
        this.editUser()
    }

    // Получение текущей доски
    protected getCurrBoard() {
        this.$socket.emit(act.EMIT_GET_ALL_BOARD, { _id: this.currBoardId }, (boards: Board[]) => {
            this.mainState.currentBoard = boards[0]
            this.mainState.currentBoard.password = ''
            this.loading = false
        })
    }

    // Изменение пользователя
    protected editUser() {
        this.$socket.emit(act.EMIT_EDIT_USER, this.mainState.me, () => {
            console.log('user edited')
        })
    }

    // Изменение доски
    protected editBoard() {
        this.$socket.emit(act.EMIT_EDIT_BOARD, this.mainState.currentBoard, () => {
            console.log('board edited')
        })
    }

    // История действий
    protected keyupHandler(event: any) {
        if (event.ctrlKey && event.shiftKey && event.code === 'KeyZ') {
            // paper.project.exportSVG()
            // paper.project.importSVG(svg)
            history.redo()
        } else if (event.ctrlKey && event.code === 'KeyZ') {
            history.undo()
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

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
canvas {
    height: 100%;
    width: 100%;
    background: #173e23;
}
.green-bg {
    height: 100%;
    width: 100%;
    background: #173e23;
}
.fill-56px {
    height: calc(100vh - 56px);
}
</style>
