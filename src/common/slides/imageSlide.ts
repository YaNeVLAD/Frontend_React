import { uuid } from "../../storage/utils/uuid.ts"
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
        },
        note: ''
    }
}

export { IMAGE_SLIDE }