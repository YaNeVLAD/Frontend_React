import { deepCopy } from "../../storage/utils/deepCopy"
import { TitleArea } from "../TextArea/TitleTextArea"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"
import { BaseImage } from "../baseImage"

const TITLE_AND_IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'title&image',
    objects: [BaseImage(), TitleArea()],
    background: {
        value: "#FEFEFE",
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