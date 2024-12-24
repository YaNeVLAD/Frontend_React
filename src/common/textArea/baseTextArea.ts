import { uuid } from "../../storage/utils/functions"
import { TextAreaType } from "../../storage/types"
import { BASE_TEXT_AREA_PLACEHOLDER } from "../../storage/constants"

function BASE_TEXT_AREA(): TextAreaType {
    return {
        id: uuid(),
        type: 'textObj',
        pos: { x: 50, y: 50 },
        size: { width: 200, height: 50 },
        turnAngle: 0,
        placeholder: BASE_TEXT_AREA_PLACEHOLDER,
        text: {
            value: '',
            alignment: { horizontal: 'end', vertical: 'end' },
            font: {
                size: 30,
                color: '#000000',
                family: 'Roboto-Regular',
                weight: 400,
            }
        }
    }
}

export { BASE_TEXT_AREA }