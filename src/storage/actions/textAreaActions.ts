import { deepCopy } from "../utils/deepCopy"
import { SlideType } from "../types"

function changeTextValue(
    slide: SlideType,
    { selectedObjectId, value }: { selectedObjectId?: string, value: string }
): SlideType {
    const slideCopy = deepCopy(slide)

    const selectedObject = slideCopy.objects.find(
        obj => obj.id == selectedObjectId
    )
    if (selectedObject == undefined || selectedObject.type != 'textObj') return slide

    selectedObject.text.value = value

    return slideCopy
}

export { changeTextValue }