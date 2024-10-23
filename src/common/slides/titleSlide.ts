import { SlideType } from "../../storage/types"
import { SUBTITLE_TEXT_AREA } from "../textArea/subtitleTextArea"
import { TITLE_TEXT_AREA } from "../textArea/titleTextArea"

const TITLE_SLIDE: SlideType = {
    id: "0",
    startContentType: 'title',
    objects: [TITLE_TEXT_AREA, SUBTITLE_TEXT_AREA],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_SLIDE }