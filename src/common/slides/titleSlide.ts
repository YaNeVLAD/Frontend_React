import { SlideType } from "../../storage/types"
import { SubtitleArea } from "../TextArea/subtitleTextArea"
import { TitleArea } from "../TextArea/titleTextArea"

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