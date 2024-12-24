import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"
import { TITLE_AREA_PLACEHOLDER } from "../../storage/constants"

function TITLE_ON_TEXT_SLIDE_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 15,
            y: 80,
        },
        size: {
            width: 900,
            height: 80,
        },
        turnAngle: 0,
        placeholder: TITLE_AREA_PLACEHOLDER,
        text: {
            value: '',
            alignment: { horizontal: 'start', vertical: 'center' },
            font: {
                size: 25,
                color: '#000000',
                family: 'Roboto-Bold',
                weight: 400,
            }
        }
    }
}

export { TITLE_ON_TEXT_SLIDE_AREA }