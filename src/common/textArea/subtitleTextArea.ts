import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function SUBTITLE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 15,
            y: 255,
        },
        size: {
            width: 900,
            height: 50,
        },
        value: 'Введите подзаголовок',
        font: 'Arial, sans-serif',
        color: 'black',
        textSize: 28,
        turnAngle: 0,
    }
}

export { SUBTITLE_TEXT_AREA }