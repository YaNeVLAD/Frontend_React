import { EditorType } from "../types"
import { deepCopy } from "../utils/deepCopy"

function changeSrcValue(editor: EditorType, { value }: { value: string }): EditorType {
    const editorCopy = deepCopy(editor)

    const selectedSlide = editorCopy.presentation.slides.find(
        slide => slide.id == editorCopy.selection.selectedSlideId
    )
    if (selectedSlide == undefined) return editor

    const selectedObject = selectedSlide.objects.find(
        obj => obj.id == editorCopy.selection.selectedObjectId
    )
    if (selectedObject == undefined || selectedObject.type != 'imageObj') return editor

    selectedObject.src.value = value

    return {
        ...editorCopy,
        selection: {
            selectedSlideId: selectedSlide.id,
            selectedObjectId: selectedObject.id
        }
    }
}

export { changeSrcValue }