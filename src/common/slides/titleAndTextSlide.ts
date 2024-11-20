import { TextTitleArea } from "../TextArea/TitleOnTextSlideTextArea"
import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { TextArea } from "../TextArea/TextArea"
import { SlideType } from "../../storage/types"

const TITLE_AND_TEXT_SLIDE: SlideType = {
    id: "0",
    preset: "title&text",
    objects: [TextTitleArea(), TextArea()],
    background: {
        value: "#ffffff",
        type: "solid"
    }
}

const TitleAndTextSlide = (): SlideType => {
    return {
        ...deepCopy(TITLE_AND_TEXT_SLIDE),
        id: uuid()
    }
}


export { TitleAndTextSlide }