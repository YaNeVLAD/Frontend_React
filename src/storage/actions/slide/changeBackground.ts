import { Background, EditorType, PresentationType } from "../../types"
import { deepCopy } from "../../deepCopy"

function changeSlideBackground(
    editor: EditorType,
    { background }: { background: Background }
): EditorType {
    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(slide =>
        slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    selectedSlide.background = background

    return {
        ...editor,
        presentation: presentationCopy,
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: undefined
        }
    }
}

export { changeSlideBackground }