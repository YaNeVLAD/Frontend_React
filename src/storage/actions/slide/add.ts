import { EMPTY_SLIDE } from "../../../common/emptySlide"
import { deepCopy } from "../../deepCopy"
import { uuid } from "../../functions"
import { EditorType } from "../../types"

function addSlide(editor: EditorType): EditorType {
    const newSlide = deepCopy(EMPTY_SLIDE)
    newSlide.id = uuid()

    const updatedSlides = [
        ...editor.presentation.slides,
        newSlide,
    ]

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