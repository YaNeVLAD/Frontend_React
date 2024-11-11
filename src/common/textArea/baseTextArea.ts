import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const BASE_TEXT_AREA: TextAreaType = {
    id: uuid(),
    type: 'textObj',
    pos: { x: 50, y: 50 },
    size: { width: 20, height: 10 },
    turnAngle: 0,
    value: 'Hello World',
    font: 'Arial, sans-serif',
    color: 'black',
    textSize: 30,
}

const BaseArea = { ...BASE_TEXT_AREA, id: uuid() }

export { BaseArea }