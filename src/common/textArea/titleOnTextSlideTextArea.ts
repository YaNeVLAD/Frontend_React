import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const TITLE_ON_TEXT_SLIDE_AREA: TextAreaType = {
    id: "0",
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

const TextTitleArea = (): TextAreaType => {
    return {
        ...deepCopy(TITLE_ON_TEXT_SLIDE_AREA),
        id: uuid()
    }
}

export { TextTitleArea }