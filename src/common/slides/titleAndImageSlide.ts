import { TITLE_TEXT_AREA } from "../textArea/titleTextArea"
import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../baseImage"

const TITLE_AND_IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'title&image',
    objects: [BASE_IMAGE, TITLE_TEXT_AREA],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_AND_IMAGE_SLIDE }