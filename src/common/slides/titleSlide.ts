import { SlideType } from "../../storage/types"
import { SubtitleArea } from "../textArea/subtitleTextArea"
import { TitleArea } from "../textArea/titleTextArea"

const TITLE_SLIDE: SlideType = {
    id: "0",
    preset: 'title',
    objects: [TitleArea, SubtitleArea],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { TITLE_SLIDE }