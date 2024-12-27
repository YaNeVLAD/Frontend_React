import { uuid } from "../../storage/utils/uuid"
import { TextAreaType } from "../../storage/types"
import { TITLE_AREA_PLACEHOLDER } from "../../storage/constants"

function TITLE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 15,
            y: 50,
        },
        size: {
            width: 900,
            height: 200,
        },
        turnAngle: 0,
        placeholder: TITLE_AREA_PLACEHOLDER,
        text: {
            value: '',
            alignment: { horizontal: 'center', vertical: 'center' },
            font: {
                size: 52,
                color: '#000000',
                family: 'Roboto-Bold',
                weight: 600
            }
        }
    }
}

export { TITLE_TEXT_AREA }