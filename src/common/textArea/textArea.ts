import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"
import { TEXT_AREA_PLACEHOLDER } from "../../storage/constants"

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
        turnAngle: 0,
        placeholder: TEXT_AREA_PLACEHOLDER,
        text: {
            value: '',
            alignment: { horizontal: 'start', vertical: 'start' },
            font: {
                size: 18,
                color: '#202020',
                family: 'Roboto-Regular',
                weight: 400,
            }
        }
    }
}

export { TEXT_AREA }