import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"

const EMPTY_SLIDE: SlideType = {
    id: "0",
    preset: 'none',
    objects: [],
    background: {
        value: "#ffffff",
        type: "solid"
    }
}

const EmptySlide = (): SlideType => {
    return {
        ...deepCopy(EMPTY_SLIDE),
        id: uuid()
    }
}


export { EmptySlide }