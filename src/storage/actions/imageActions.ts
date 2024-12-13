import { SlideType } from "../types"
import { deepCopy } from "../utils/deepCopy"

function changeSrcValue(
    slide: SlideType,
    {
        selectedObjectId,
        value,
    }: {
        selectedObjectId: string,
        value: string,
    }
): SlideType {
    const slideCopy = deepCopy(slide)

    const selectedObject = slideCopy.objects.find(
        obj => obj.id == selectedObjectId
    )

    if (selectedObject == undefined) return slide

    if (selectedObject.type == "imageObj") {
        selectedObject.src.value = value
    }

    return slideCopy
}

export { changeSrcValue }