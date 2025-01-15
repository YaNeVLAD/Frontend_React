import { uuid } from "../../storage/utils/uuid"
import { TextAreaType } from "../../storage/types"
import { TEXT_AREA_PLACEHOLDER } from "../../storage/constants"

function TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: {
            x: 6,
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
            decoration: 'none',
            font: {
                size: 18,
                color: '#202020',
                family: 'Roboto',
                weight: 'Normal',
                style: 'Normal',
            }
        }
    }
}

export { TEXT_AREA }