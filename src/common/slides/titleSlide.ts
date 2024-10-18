import { uuid } from "../../storage/functions"
import { SlideType } from "../../storage/types"
import { BASE_TEXT_AREA } from "../baseTextArea"

const TITLE_SLIDE: SlideType = {
    id: uuid(),
    startContentType: 'title',
    objects: [BASE_TEXT_AREA],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_SLIDE }