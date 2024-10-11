import { deepCopy } from "../../deepCopy"
import { EditorType } from "../../types"

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

export { changeObjectSize }