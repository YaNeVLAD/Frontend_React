import { uuid } from "../../storage/functions"
import { SlideType } from "../../storage/types"

const EMPTY_SLIDE: SlideType = {
    id: uuid(),
    startContentType: 'none',
    objects: [],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { EMPTY_SLIDE }