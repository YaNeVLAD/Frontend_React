import { TextAreaType } from "../../storage/types"
import { uuid } from "../../storage/utils/functions"

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

const TitleArea = { ...TITLE_TEXT_AREA, id: uuid() }

export { TitleArea }