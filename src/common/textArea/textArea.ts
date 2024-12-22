import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 15,
            y: 180,
        },
        size: {
            width: 900,
            height: 300,
        },
        value: 'Введите текст',
        font: 'Arial, sans-serif',
        color: '#595959',
        textSize: 18,
        turnAngle: 0,
    }
}

export { TEXT_AREA }