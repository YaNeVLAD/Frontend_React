import { SUBTITLE_TEXT_AREA } from "../TextArea/SubtitleTextArea"
import { TITLE_TEXT_AREA } from "../TextArea/TitleTextArea"
import { SlideType } from "../../storage/types"
import { uuid } from "../../storage/utils/functions"

function TITLE_SLIDE(): SlideType {
    return {
        id: uuid(),
        preset: 'title',
        objects: [TITLE_TEXT_AREA(), SUBTITLE_TEXT_AREA()],
        background: {
            value: "#ffffff",
            type: "solid"
        },
        note: ''
    }
}

export { TITLE_SLIDE }