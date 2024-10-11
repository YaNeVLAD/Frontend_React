import { deepCopy } from "../storage/deepCopy"
import { uuid } from "../storage/functions"
import { SlideType } from "../storage/types"

const EMPTY_SLIDE: SlideType = deepCopy({
    id: uuid(),
    objects: [],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
})

export { EMPTY_SLIDE }