import { uuid } from "../../storage/utils/uuid"
import { TextAreaType } from "../../storage/types"
import { SUBTITLE_AREA_PLACEHOLDER } from "../../storage/constants"

function SUBTITLE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 6,
            y: 255,
        },
        size: {
            width: 900,
            height: 50,
        },
        turnAngle: 0,
        placeholder: SUBTITLE_AREA_PLACEHOLDER,
        text: {
            value: '',
            alignment: { horizontal: 'center', vertical: 'start' },
            decoration: 'none',
            font: {
                size: 28,
                color: '#404040',
                family: 'Roboto',
                weight: 'Normal',
                style: 'Normal',
            }
        }
    }
}

export { SUBTITLE_TEXT_AREA }