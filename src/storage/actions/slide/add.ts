import { EMPTY_SLIDE } from "../../../common/emptySlide"
import { deepCopy } from "../../deepCopy"
import { uuid } from "../../functions"
import { EditorType } from "../../types"

function addSlide(editor: EditorType): EditorType {
    const newSlide = deepCopy(EMPTY_SLIDE)
    newSlide.id = uuid()

    const selectedSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlideIndex == -1) return editor

    const before = editor.presentation.slides.slice(0, selectedSlideIndex + 1)
    const after = editor.presentation.slides.slice(selectedSlideIndex + 1, editor.presentation.slides.length)

    const updatedSlides = before.concat([newSlide], after)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: updatedSlides,
        },
        selection: {
            selectedSlide: newSlide,
            selectedObject: undefined,
        },
    }
}

export { addSlide }