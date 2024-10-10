import { EditorType, TextAreaType } from "../../types"
import { deepCopy } from "../../deepCopy"

function changeTextValue(editor: EditorType, { value }: { value: string }): EditorType {
    const editorCopy = deepCopy(editor)

    if (editorCopy.selection.selectedObject?.type != 'textObj') return editor

    const selectedSlide = editorCopy.presentation.slides.find(
        slide => slide.id == editorCopy.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    let selectedObject = selectedSlide.objects.find(
        obj => obj.id == editorCopy.selection.selectedObject?.id
    )
    if (selectedObject == undefined) return editor

    selectedObject = (selectedObject as TextAreaType)
    selectedObject.value = value

    return {
        ...editorCopy,
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: selectedObject
        }
    }
}

export { changeTextValue }