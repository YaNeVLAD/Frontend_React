import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function TITLE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 50,
            y: 40,
        },
        size: {
            width: 95,
            height: 35,
        },
        value: 'Введите заголовок',
        font: 'Arial, sans-serif',
        color: 'black',
        textSize: 52,
        turnAngle: 0,
    }
}

export { TITLE_TEXT_AREA }