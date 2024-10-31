import { deepCopy } from "../../deepCopy"
import { EditorType, PositionType } from "../../types"

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

export { moveObject }