import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const BASE_TEXT_AREA: TextAreaType = {
    id: uuid(),
    type: 'textObj',
    pos: { x: 50, y: 50 },
    size: { width: 300, height: 100 },
    turnAngle: 0,
    value: 'Hello World',
    font: 'Inter, sans-serif',
    color: 'black',
    textSize: 30,
}

export { BASE_TEXT_AREA }