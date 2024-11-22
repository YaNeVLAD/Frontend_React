import { TITLE_TEXT_AREA } from "../TextArea/TitleTextArea"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../BaseImage.ts"

function TITLE_AND_IMAGE_SLIDE(): SlideType {
    return {
        id: uuid(),
        preset: 'title&image',
        objects: [BASE_IMAGE(), TITLE_TEXT_AREA()],
        background: {
            value: "#ffffff",
            type: "solid"
        }
    }
}

export { TITLE_AND_IMAGE_SLIDE }