import { BackgroundType, EditorType, PresentationType, SlideStartContentType, SlideType } from "../types"
import { TITLE_AND_IMAGE_SLIDE } from "../../common/slides/titleAndImageSlide"
import { EMPTY_SLIDE } from "../../common/slides/emptySlide"
import { IMAGE_SLIDE } from "../../common/slides/imageSlide"
import { TITLE_SLIDE } from "../../common/slides/titleSlide"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/functions"
import { CSSProperties } from "react"

function addSlide(
    editor: EditorType,
    { type }: { type: SlideStartContentType }
): EditorType {
    const newSlide = deepCopy(selectSlideStartContent(type))
    newSlide.objects.forEach(obj => obj.id = uuid())
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

function changeSlideBackground(
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

function deselectSlideObjects(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObject: undefined
        }
    }
}

function moveSlide(editor: EditorType, { slides }: { slides: Array<SlideType> }): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides
        }
    }
}

function selectSlide(editor: EditorType, { id }: { id: string }): EditorType {
    const slide = editor.presentation.slides.find(slide => slide.id == id)
    if (slide == undefined) return editor

    return {
        ...editor,
        selection: {
            selectedSlide: slide,
            selectedObject: undefined
        }
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

function selectSlideBackgroundType(style: CSSProperties, background: BackgroundType): CSSProperties {
    switch (background.type) {
        case 'solid':
            {
                style.backgroundColor = background.value
                break
            }
        case 'image':
            {
                style.backgroundImage = `url('${background.value}')`
                break
            }
        case 'gradient':
            {
                style.backgroundImage = `linear-gradient(to left, '${background.value[0]}', '${background.value[1]}')`
                break
            }
    }

    return style
}

export {
    addSlide,
    changeSlideBackground,
    deleteSlide,
    deselectSlideObjects,
    moveSlide,
    selectSlide,
    selectSlideBackgroundType
}