import { uuid } from "../storage/functions"
import { SlideType } from "../storage/types"
import { BASE_IMAGE } from "./BaseImage"
import { BASE_TEXT_AREA } from "./BaseTextArea"

const EMPTY_SLIDE: SlideType = {
    id: uuid(),
    objects: [BASE_IMAGE, BASE_TEXT_AREA],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { EMPTY_SLIDE }