import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function TITLE_ON_TEXT_SLIDE_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 15,
            y: 80,
        },
        size: {
            width: 900,
            height: 80,
        },
        value: 'Введите заголовок',
        font: 'Arial, sans-serif',
        color: 'black',
        textSize: 25,
        turnAngle: 0,
    }
}

export { TITLE_ON_TEXT_SLIDE_AREA }