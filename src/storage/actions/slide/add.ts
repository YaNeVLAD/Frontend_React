import { TITLE_AND_IMAGE_SLIDE } from "../../../common/slides/titleAndImageSlide"
import { EMPTY_SLIDE } from "../../../common/slides/emptySlide"
import { EditorType, SlideStartContentType, SlideType } from "../../types"
import { IMAGE_SLIDE } from "../../../common/slides/imageSlide"
import { TITLE_SLIDE } from "../../../common/slides/titleSlide"
import { uuid } from "../../functions"
import { deepCopy } from "../../deepCopy"

function addSlide(editor: EditorType, { type }: { type: SlideStartContentType }): EditorType {
    const newSlide = deepCopy(selectSlideStartContent(type))
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

function selectSlideStartContent(type: SlideStartContentType): SlideType {
    switch (type) {
        case 'none':
            return EMPTY_SLIDE
        case 'image':
            return IMAGE_SLIDE
        case 'title':
            return TITLE_SLIDE
        case 'title&image':
            return TITLE_AND_IMAGE_SLIDE
        default:
            throw Error("Invalid slide start content type")
    }
}

export { addSlide }