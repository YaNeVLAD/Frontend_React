import { SlideType } from "../../storage/types"

const EMPTY_SLIDE: SlideType = {
    id: "0",
    preset: 'none',
    objects: [],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { EMPTY_SLIDE }