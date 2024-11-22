import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 50,
            y: 51,
        },
        size: {
            width: 90,
            height: 60,
        },
        value: 'Введите текст',
        font: 'Arial, sans-serif',
        color: '#595959',
        textSize: 18,
        turnAngle: 0,
    }
}

export { TEXT_AREA }