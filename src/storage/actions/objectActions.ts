import { EditorType, PositionType, SelectionType, SizeType, SlideType } from "../types"
import { BASE_TEXT_AREA } from "../../common/TextArea/BaseTextArea"
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
            width: (image.width == 0) ? 150 : image.width,
            height: (image.height == 0) ? 150 : image.height
        }
    } else {
        newObject = BASE_TEXT_AREA()
        newObject.value = value
    }
    newObject.id = uuid()

    slideCopy.objects.push(newObject)

    return slideCopy
}

function changeObjectSize(editor: EditorType, { width, height }: { width: number, height: number }): EditorType {
    const editorCopy = deepCopy(editor)

    // if (editorCopy.selection.selectedObject?.type != 'textObj') return editor

    const selectedSlide = editorCopy.presentation.slides.find(
        slide => slide.id == editorCopy.selection.selectedSlideId
    )
    if (selectedSlide == undefined) return editor

    const selectedObject = selectedSlide.objects.find(
        obj => obj.id == editorCopy.selection.selectedObjectId
    )
    if (selectedObject == undefined) return editor

    selectedObject.size.height = height
    selectedObject.size.width = width

    return {
        ...editorCopy,
        selection: {
            selectedSlideId: selectedSlide.id,
            selectedObjectId: selectedObject.id
        }
    }
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
    return {
        ...selection,
        selectedSlideId: selection.selectedSlideId,
        selectedObjectId: selectedObjectId
    }
}

export {
    addObject,
    changeObjectSize,
    deleteObject,
    deselectAllObjects,
    selectObject,
    changeObjectBounds
}