import paper from 'paper'
import store from '../../store/index'
import { createLayer } from '../shared'
import history from '../history'
import { DrawAction } from '../action'

const local = {
    path: null,
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null
}

function onMouseDown() {
    const layer = createLayer()
    local.path = new paper.Path()
    const rgb = hexToRgb(store.getters.toolArgs.color || '#000000')
    local.path.fillColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`
    layer.addChild(local.path)
}

function onMouseDrag(event) {
    if (!local.path) return
    const step = event.delta
    step.x *= store.getters.toolArgs.size / 2.8
    step.y *= store.getters.toolArgs.size / 2.8
    step.angle += 90

    const top = event.middlePoint.add(step)
    const bottom = event.middlePoint.subtract(step)
    local.path.selected = false
    local.path.add(top)
    local.path.insert(0, bottom)
}

function onMouseUp() {
    local.path.simplify()
    const action = new DrawAction({
        layer: local.path.layer.name,
        tool: store.getters.tool,
        points: local.path.segments.map((seg) => {
            return {
                x: seg._point._x,
                y: seg._point._y,
            }
        }),
    })
    history.add(action)
    local.path.selected = false
    local.path = null
}

export const tool = new paper.Tool()
tool.minDistance = 7
tool.maxDistance = 7
tool.onMouseDown = onMouseDown
tool.onMouseDrag = onMouseDrag
tool.onMouseUp = onMouseUp
