import paper from 'paper'
import store from '../../store/index'
import { createLayer } from '../shared'
import history from '../history'
import { DrawAction } from '../action'

const local = {
    path: null,
    center: null,
}

function onMouseDown(event) {
    const layer = createLayer()
    local.path = new paper.Shape.Circle({
        center: event.point,
        strokeColor: store.getters.shapeArgs.color,
        strokeWidth: store.getters.shapeArgs.size,
        fillColor: store.getters.shapeArgs.size > 49 ? store.getters.shapeArgs.color : '#00000000',
    })
    layer.addChild(local.path)
    local.center = event.point
}

function onMouseDrag(event) {
    if (!local.path) return
    local.path.radius = Math.sqrt(
        (event.point.x - local.center.x) * (event.point.x - local.center.x) +
            (event.point.y - local.center.y) * (event.point.y - local.center.y)
    )
}

function onMouseUp() {
    const action = new DrawAction({
        layer: local.path.layer.name,
        tool: store.getters.tool,
        center: local.center,
        radius: local.path.radius,
    })
    local.path = null
    history.add(action)
}

export const tool = new paper.Tool()
tool.onMouseDown = onMouseDown
tool.onMouseDrag = onMouseDrag
tool.onMouseUp = onMouseUp
