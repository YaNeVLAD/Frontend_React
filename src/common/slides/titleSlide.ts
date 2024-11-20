import { SubtitleArea } from "../TextArea/SubtitleTextArea"
import { deepCopy } from "../../storage/utils/deepCopy"
import { TitleArea } from "../TextArea/TitleTextArea"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"

const TITLE_SLIDE: SlideType = {
    id: "0",
    preset: 'title',
    objects: [TitleArea(), SubtitleArea()],
    background: {
        value: "#ffffff",
        type: "solid"
    }
}

const TitleSlide = (): SlideType => {
    return {
        ...deepCopy(TITLE_SLIDE),
        id: uuid()
    }
}

export { TitleSlide }