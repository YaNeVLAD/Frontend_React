import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const TITLE_TEXT_AREA: TextAreaType = {
    id: "0",
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

const TitleArea = (): TextAreaType => {
    return {
        ...deepCopy(TITLE_TEXT_AREA),
        id: uuid()
    }
}

export { TitleArea }