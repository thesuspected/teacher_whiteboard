import Event, { EventNames } from '@/events/events'

function saveCanvas() {
    // Отправляем событие сохранения холста
    Event.$emit(EventNames.ON_CANVAS_SAVE)
}

class History {
    constructor(limit) {
        this.limit = limit
        this.clear()
    }
    add(action) {
        if (this.history.length >= this.limit || this.current == this.history.length - 1) {
            this.history.shift()
        }
        this.history.push(action)
        this.current = this.history.length
        saveCanvas()
    }
    undo() {
        if (this.current > 0) {
            this.history[--this.current].unexec()
        }
        saveCanvas()
    }
    redo() {
        if (this.history.length > this.current) {
            this.history[this.current++].exec()
        }
        saveCanvas()
    }
    clear() {
        this.history = []
        this.current = 0
    }
}

// Default size 20
export default new History(100)
