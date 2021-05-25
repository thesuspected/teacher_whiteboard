<template>
    <div class="fill">
        <canvas id="whiteboard" resize></canvas>
        <mainPanel></mainPanel>
        <historyPanel></historyPanel>
    </div>
</template>

<script>
import paper from 'paper'
import MainPanel from './panel/MainPanel'
import HistoryPanel from './panel/HistoryPanel'
import history from '../tools/history.js'

export default {
    components: {
        mainPanel: MainPanel,
        historyPanel: HistoryPanel,
    },
    created() {
        paper.install(window)
        document.addEventListener('keyup', this.keyupHandler)
    },
    mounted() {
        paper.setup('whiteboard')
    },
    destroyed() {
        document.removeEventListener('keyup', this.keyupHandler)
    },
    methods: {
        keyupHandler(event) {
            if (event.ctrlKey && event.shiftKey && event.code === 'KeyZ') {
                // paper.project.exportSVG()
                // paper.project.importSVG(svg)
                history.redo()
            } else if (event.ctrlKey && event.code === 'KeyZ') {
                history.undo()
            }
        },
    },
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
canvas {
    height: 100vh;
    width: 100%;
    background: #173e23;
}
</style>
