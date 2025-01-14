import { PositionType, SelectionType, SizeType, SlideType } from "../types"
import { BASE_TEXT_AREA } from "../../common/TextArea/BaseTextArea"
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../constants.ts"
import { BASE_IMAGE } from "../../common/BaseImage.ts"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/uuid.ts"

function addObject(
    slide: SlideType,
    {
        type,
        value
    }: {
        selectedSlideId?: string,
        type: 'imageObj' | 'textObj',
        value: string
    }
): SlideType {
    const slideCopy = deepCopy(slide)

    let newObject
    if (type === 'imageObj') {
        newObject = BASE_IMAGE()
        const image = new Image()
        image.src = value
        newObject.src.value = value
        newObject.size = {
            width: (image.width == 0) ? 150 : Math.min(image.width, SLIDE_WIDTH),
            height: (image.height == 0) ? 150 : Math.min(image.height, SLIDE_HEIGHT)
        }
    } else {
        newObject = BASE_TEXT_AREA()
        newObject.text.value = value
    }
    newObject.id = uuid()

    slideCopy.objects.push(newObject)

    return slideCopy
}

function deleteObject(
    slide: SlideType,
    {
        selectedObjectId
    }: {
        selectedSlideId?: string,
        selectedObjectId?: string,
    }
): SlideType {
    if (selectedObjectId == undefined) return slide

    const slideCopy = deepCopy(slide)

    const selectedObjectIndex = slideCopy.objects.findIndex(obj =>
        obj.id == selectedObjectId
    )
    if (selectedObjectIndex === -1) return slide

    slideCopy.objects.splice(selectedObjectIndex, 1)

    return slideCopy
}

function deselectAllObjects(
    selection: SelectionType
): SelectionType {
    return {
        ...selection,
        selectedObjectId: undefined
    }
}

function changeObjectBounds(
    slide: SlideType,
    {
        selectedObjectId,
        position,
        size
    }: {
        selectedSlideId: string,
        selectedObjectId: string,
        position: PositionType
        size?: SizeType
    }
): SlideType {
    const slideCopy = deepCopy(slide)

    const object = slideCopy.objects.find(
        obj => obj.id == selectedObjectId
    )

    if (object == undefined) return slide

    object.pos = position
    if (size) object.size = size

    return slideCopy
}

function selectObject(
    selection: SelectionType,
    selectedObjectId: string
): SelectionType {
    if (!selection.selectedSlideIds || selection.selectedSlideIds.length == 0) return selection
    return {
        ...selection,
        selectedSlideIds: [selection.selectedSlideIds[selection.selectedSlideIds.length - 1]],
        selectedObjectId: selectedObjectId
    }
}

export {
    addObject,
    deleteObject,
    deselectAllObjects,
    selectObject,
    changeObjectBounds
}