import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function TITLE_ON_TEXT_SLIDE_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 50,
            y: 15,
        },
        size: {
            width: 90,
            height: 7,
        },
        value: 'Введите заголовок',
        font: 'Arial, sans-serif',
        color: 'black',
        textSize: 25,
        turnAngle: 0,
    }
}

export { TITLE_ON_TEXT_SLIDE_AREA }