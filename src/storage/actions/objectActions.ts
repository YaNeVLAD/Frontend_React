import { EditorType, PositionType, PresentationType, SizeType } from "../types"
import { BASE_IMAGE } from "../../common/baseImage"
import { BASE_TEXT_AREA } from "../../common/textArea/baseTextArea"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/functions"

function addObject(
    editor: EditorType,
    { type }: { type: 'imageObj' | 'textObj' }
): EditorType {
    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(
        slide => slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    let newObject
    if (type === 'imageObj') {
        newObject = deepCopy(BASE_IMAGE)
    } else {
        newObject = deepCopy(BASE_TEXT_AREA)
    }
    newObject.id = uuid()

    selectedSlide.objects.push(newObject)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: newObject
        },
    }
}

function changeObjectSize(editor: EditorType, { width, height }: { width: number, height: number }): EditorType {
    const editorCopy = deepCopy(editor)

    if (editorCopy.selection.selectedObject?.type != 'textObj') return editor

    const selectedSlide = editorCopy.presentation.slides.find(
        slide => slide.id == editorCopy.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    const selectedObject = selectedSlide.objects.find(
        obj => obj.id == editorCopy.selection.selectedObject?.id
    )
    if (selectedObject == undefined) return editor

    selectedObject.size.height = height
    selectedObject.size.width = width

    return {
        ...editorCopy,
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: selectedObject
        }
    }
}

function deleteObject(editor: EditorType): EditorType {
    if (editor.selection.selectedObject == undefined) return editor

    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(slide =>
        slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    const selectedObjectIndex = selectedSlide.objects.findIndex(obj =>
        obj.id == editor.selection.selectedObject?.id
    )
    if (selectedObjectIndex === -1) return editor

    selectedSlide.objects.splice(selectedObjectIndex, 1)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: undefined,
        },
    }
}

function deselectAllObjects(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObject: undefined
        }
    }
}

function moveObject(editor: EditorType, pos: PositionType): EditorType {
    const editorCopy = deepCopy(editor)
    const selectedSlide = editorCopy.presentation.slides
        .find(slide => slide.id == editorCopy.selection.selectedSlide.id)

    if (selectedSlide == undefined) return editor

    const object = selectedSlide.objects
        .find(obj => obj.id == editorCopy.selection.selectedObject?.id)

    if (object == undefined) return editor

    object.pos = pos

    return {
        ...editorCopy,
        selection: {
            ...editorCopy.selection,
            selectedSlide: selectedSlide,
            selectedObject: object
        }
    }
}

function resizeObject(editor: EditorType, size: SizeType): EditorType {
    const editorCopy = deepCopy(editor)
    const selectedSlide = editorCopy.presentation.slides
        .find(slide => slide.id == editorCopy.selection.selectedSlide.id)

    if (selectedSlide == undefined) return editor

    const object = selectedSlide.objects
        .find(obj => obj.id == editorCopy.selection.selectedObject?.id)

    if (object == undefined) return editor

    object.size = size

    return {
        ...editorCopy,
        selection: {
            ...editorCopy.selection,
            selectedSlide: selectedSlide,
            selectedObject: object
        }
    }
}

function selectObject(editor: EditorType, { id }: { id: string }): EditorType {
    const object = editor.selection.selectedSlide.objects.find(object => object.id == id)
    if (object == undefined) return editor

    return {
        ...editor,
        selection: {
            selectedSlide: editor.selection.selectedSlide,
            selectedObject: object
        }
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