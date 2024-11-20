import { deepCopy } from "../../storage/utils/deepCopy"
import { TitleArea } from "../TextArea/TitleTextArea"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"
import { BaseImage } from "../BaseImage.ts"

const TITLE_AND_IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'title&image',
    objects: [BaseImage(), TitleArea()],
    background: {
        value: "#ffffff",
        type: "solid"
    }
}

const TitleAndImageSlide = (): SlideType => {
    return {
        ...deepCopy(TITLE_AND_IMAGE_SLIDE),
        id: uuid()
    }
}


export { TitleAndImageSlide }