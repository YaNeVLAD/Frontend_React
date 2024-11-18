import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../baseImage"
import { TitleArea } from "../TextArea/titleTextArea"

const TITLE_AND_IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'title&image',
    objects: [BASE_IMAGE, TitleArea],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_AND_IMAGE_SLIDE }