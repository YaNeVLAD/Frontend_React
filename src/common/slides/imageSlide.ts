import { uuid } from "../../storage/utils/functions"
import { SlideType } from "../../storage/types"
import { BASE_IMAGE } from "../BaseImage.ts"

function IMAGE_SLIDE(): SlideType {
    return {
        id: uuid(),
        preset: 'image',
        objects: [BASE_IMAGE()],
        background: {
            value: "#ffffff",
            type: "solid"
        }
    }
}

export { IMAGE_SLIDE }