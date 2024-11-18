import { TextTitleArea } from "../TextArea/titleOnTextSlideTextArea"
import { SlideType } from "../../storage/types"
import { TextArea } from "../TextArea/textArea"

const TITLE_AND_TEXT_SLIDE: SlideType = {
    id: "0",
    preset: "title&text",
    objects: [TextTitleArea, TextArea],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_AND_TEXT_SLIDE }