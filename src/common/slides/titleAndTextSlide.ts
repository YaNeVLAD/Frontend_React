import { TITLE_ON_TEXT_SLIDE_AREA } from "../TextArea/TitleOnTextSlideTextArea"
import { uuid } from "../../storage/utils/functions"
import { TEXT_AREA } from "../TextArea/TextArea"
import { SlideType } from "../../storage/types"

function TITLE_AND_TEXT_SLIDE(): SlideType {
    return {
        id: uuid(),
        preset: "title&text",
        objects: [TITLE_ON_TEXT_SLIDE_AREA(), TEXT_AREA()],
        background: {
            value: "#ffffff",
            type: "solid"
        }
    }
}

export { TITLE_AND_TEXT_SLIDE }