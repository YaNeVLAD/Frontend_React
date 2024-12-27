import { uuid } from "../../storage/utils/uuid"
import { SlideType } from "../../storage/types"

function EMPTY_SLIDE(): SlideType {
    return {
        id: uuid(),
        preset: 'none',
        objects: [],
        background: {
            value: "#ffffff",
            type: "solid"
        },
        note: ''
    }
}

export { EMPTY_SLIDE }