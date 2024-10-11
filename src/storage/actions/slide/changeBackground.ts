import { BackgroundType, EditorType, PresentationType } from "../../types"
import { deepCopy } from "../../deepCopy"

function changeSlideBackgroundType(
    editor: EditorType,
    { background }: { background: BackgroundType }
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
            selectedObject: editor.selection.selectedObject
        }
    }
}

export { changeSlideBackgroundType }