import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const TEXT_AREA: TextAreaType = {
    id: "0",
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

const TextArea = (): TextAreaType => {
    return {
        ...deepCopy(TEXT_AREA),
        id: uuid()
    }
}

export { TextArea }