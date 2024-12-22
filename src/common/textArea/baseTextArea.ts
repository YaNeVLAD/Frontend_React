import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

function BASE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: { x: 50, y: 50 },
        size: { width: 200, height: 50 },
        turnAngle: 0,
        value: 'Hello World',
        font: 'Arial, sans-serif',
        color: 'black',
        textSize: 30,
    }
}

export { BASE_TEXT_AREA }