import { uuid } from "../../storage/functions"
import { TextAreaType } from "../../storage/types"

const TITLE_TEXT_AREA: TextAreaType = {
    id: uuid(),
    type: 'textObj',
    pos: {
        x: 500,
        y: 200,
    },
    size: {
        width: 600,
        height: 150,
    },
    value: 'Введите заголовок',
    font: 'Inter, sans-serif',
    color: 'black',
    textSize: 52,
    turnAngle: 0,
}

export { TITLE_TEXT_AREA }