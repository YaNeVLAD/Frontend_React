import { uuid } from "../storage/functions"
import { TextAreaType } from "../storage/types"

const BASE_TEXT_AREA: TextAreaType = {
    id: uuid(),
    type: 'textObj',
    pos: { x: 100, y: 150 },
    size: { width: 300, height: 100 },
    turnAngle: 0,
    value: 'Hello World',
    font: 'Arial',
    color: 'black',
    textSize: 16,
}

export { BASE_TEXT_AREA }