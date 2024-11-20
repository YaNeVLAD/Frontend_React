import { deepCopy } from "../../storage/utils/deepCopy"
import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"
import { BaseImage } from "../BaseImage.ts"

const IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'image',
    objects: [BaseImage()],
    background: {
        value: "#ffffff",
        type: "solid"
    }
}

const ImageSlide = (): SlideType => {
    return {
        ...deepCopy(IMAGE_SLIDE),
        id: uuid()
    }
}


export { ImageSlide }