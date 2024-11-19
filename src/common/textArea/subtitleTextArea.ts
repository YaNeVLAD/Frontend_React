import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"

const SUBTITLE_TEXT_AREA: TextAreaType = {
    id: "0",
    type: 'textObj',
    pos: {
        x: 50,
        y: 67,
    },
    size: {
        width: 95,
        height: 16.5,
    },
    value: 'Введите подзаголовок',
    font: 'Arial, sans-serif',
    color: 'black',
    textSize: 28,
    turnAngle: 0,
}

const SubtitleArea = (): TextAreaType => {
    return {
        ...deepCopy(SUBTITLE_TEXT_AREA),
        id: uuid()
    }
}

export { SubtitleArea }