import { deepCopy } from "../../utils/deepCopy"
import { EditorType } from "../../types"

function deleteSlide(editor: EditorType): EditorType {
    if (editor.presentation.slides.length === 1) return editor

    const presentationCopy = deepCopy(editor.presentation)

    const index = presentationCopy.slides.findIndex(slide => slide.id == editor.selection.selectedSlide.id)
    if (index === -1) return editor

    const updatedSlides = presentationCopy.slides.filter((_, i) => i !== index)

    let newSelectedSlide = updatedSlides[updatedSlides.length - 1]
    if (index < updatedSlides.length) {
        newSelectedSlide = updatedSlides[index]
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selection: {
            selectedSlide: newSelectedSlide,
            selectedObject: undefined,
        },
    }
}

export { deleteSlide }