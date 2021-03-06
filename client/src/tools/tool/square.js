import paper from 'paper'
import store from '../../store/index'
import history from '../history'
import { createLayer } from '../shared'
import { DrawAction } from '../action'

const local = {
    path: null,
    center: null,
    layer: null,
}

function onMouseDown(event) {
    local.layer = createLayer()
    local.center = event.point
}

function onMouseDrag(event) {
    if (local.path) {
        local.path.remove()
    }
    local.path = new paper.Shape.Rectangle(local.center, event.point)
    local.path.strokeColor = store.getters.shapeArgs.color
    local.path.strokeWidth = store.getters.shapeArgs.size
    if (store.getters.shapeArgs.size > 49) {
        local.path.fillColor = store.getters.shapeArgs.color
    }
}

function onMouseUp(event) {
    local.layer.addChild(local.path)
    const action = new DrawAction({
        layer: local.path.layer.name,
        tool: store.getters.tool,
        from: { x: local.center.x, y: local.center.y },
        to: { x: event.point.x, y: event.point.y },
    })
    local.path = null
    history.add(action)
}

export const tool = new paper.Tool()
tool.onMouseDown = onMouseDown
tool.onMouseDrag = onMouseDrag
tool.onMouseUp = onMouseUp
