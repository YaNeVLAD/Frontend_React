import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../baseImage"

const IMAGE_SLIDE: SlideType = {
    id: "0",
    preset: 'image',
    objects: [BASE_IMAGE],
    background: {
        value: "#FEFEFE",
        type: "solid"
    }
}

export { IMAGE_SLIDE }