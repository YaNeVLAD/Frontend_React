import { EditorType, PresentationType } from "../../types"
import { deepCopy } from "../../deepCopy"

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

export { deleteObject }