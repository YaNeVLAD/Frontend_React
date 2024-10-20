import { uuid } from "../../storage/functions"
import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../baseImage"
import { TITLE_TEXT_AREA } from "./../textArea/titleTextArea"

const TITLE_AND_IMAGE_SLIDE: SlideType = {
    id: uuid(),
    startContentType: 'title&image',
    objects: [BASE_IMAGE, TITLE_TEXT_AREA],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_AND_IMAGE_SLIDE }