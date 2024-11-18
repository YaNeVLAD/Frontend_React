import { EditorType, PositionType, PresentationType, SelectionType, SizeType } from "../types"
import { BaseArea } from "../../common/textArea/baseTextArea"
import { BASE_IMAGE } from "../../common/baseImage"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/functions"

function addObject(
    editor: EditorType,
    { type, value }: { type: 'imageObj' | 'textObj', value: string }
): EditorType {
    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(
        slide => slide.id == editor.selection.selectedSlideId
    )
    if (selectedSlide == undefined) return editor

    let newObject
    if (type === 'imageObj') {
        newObject = deepCopy(BASE_IMAGE)
        newObject.src.value = value
    } else {
        newObject = deepCopy(BaseArea)
        newObject.value = value
    }
    newObject.id = uuid()

    selectedSlide.objects.push(newObject)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlideId: selectedSlide.id,
            selectedObjectId: newObject.id
        },
    }
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

function deleteObject(editor: EditorType): EditorType {
    if (editor.selection.selectedObjectId == undefined) return editor

    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(slide =>
        slide.id == editor.selection.selectedSlideId
    )
    if (selectedSlide == undefined) return editor

    const selectedObjectIndex = selectedSlide.objects.findIndex(obj =>
        obj.id == editor.selection.selectedObjectId
    )
    if (selectedObjectIndex === -1) return editor

    selectedSlide.objects.splice(selectedObjectIndex, 1)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlideId: selectedSlide.id,
            selectedObjectId: undefined,
        },
    }
}

function deselectAllObjects(
    selection: SelectionType
): SelectionType {
    console.log(selection)

    return {
        ...selection,
        selectedObjectId: undefined
    }
}

function moveObject(editor: EditorType, pos: PositionType): EditorType {
    const editorCopy = deepCopy(editor)
    const selectedSlide = editorCopy.presentation.slides
        .find(slide => slide.id == editorCopy.selection.selectedSlideId)

    if (selectedSlide == undefined) return editor

    const object = selectedSlide.objects
        .find(obj => obj.id == editorCopy.selection.selectedObjectId)

    if (object == undefined) return editor

    object.pos = pos

    return {
        ...editorCopy,
        selection: {
            ...editorCopy.selection,
            selectedSlideId: selectedSlide.id,
            selectedObjectId: object.id
        }
    }
}

function resizeObject(editor: EditorType, size: SizeType): EditorType {
    const editorCopy = deepCopy(editor)
    const selectedSlide = editorCopy.presentation.slides
        .find(slide => slide.id == editorCopy.selection.selectedSlideId)

    if (selectedSlide == undefined) return editor

    const object = selectedSlide.objects
        .find(obj => obj.id == editorCopy.selection.selectedObjectId)

    if (object == undefined) return editor

    object.size = size

    return {
        ...editorCopy,
        selection: {
            ...editorCopy.selection,
            selectedSlideId: selectedSlide.id,
            selectedObjectId: object.id
        }
    }
}

function selectObject(
    selection: SelectionType,
    selectedObjectId: string
): SelectionType {
    return {
        ...selection,
        selectedObjectId: selectedObjectId
    }
}

export {
    addObject,
    changeObjectSize,
    deleteObject,
    deselectAllObjects,
    moveObject,
    resizeObject,
    selectObject
}