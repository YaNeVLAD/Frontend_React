import { EditorType } from "../types"
import { deepCopy } from "../utils/deepCopy"

function changeSrcValue(editor: EditorType, { value }: { value: string }): EditorType {
    const editorCopy = deepCopy(editor)

    const selectedSlide = editorCopy.presentation.slides.find(
        slide => slide.id == editorCopy.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    const selectedObject = selectedSlide.objects.find(
        obj => obj.id == editorCopy.selection.selectedObject?.id
    )
    if (selectedObject == undefined || selectedObject.type != 'imageObj') return editor

    selectedObject.src.value = value

    return {
        ...editorCopy,
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: selectedObject
        }
    }
}

export { changeSrcValue }