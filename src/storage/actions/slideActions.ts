import { BackgroundType, EditorType, SelectionType, SlidePreset, SlideTheme, SlideType } from "../types"
import { TITLE_AND_TEXT_SLIDE } from "../../common/Slides/TitleAndTextSlide"
import { EMPTY_SLIDE } from "../../common/Slides/EmptySlide"
import { IMAGE_SLIDE } from "../../common/Slides/ImageSlide"
import { TITLE_SLIDE } from "../../common/Slides/TitleSlide"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/uuid"
import { CSSProperties } from "react"
import createGradient from "../utils/createGradient"

function addSlide(
    editor: EditorType,
    {
        type,
        prev,
        theme
    }: {
        type: SlidePreset,
        prev: boolean,
        theme: SlideTheme
    }
): EditorType {
    const newSlide =
        prev && editor.presentation.slides.length == 1
            ? deepCopy(selectSlidePreset('title&text'))
            : deepCopy(selectSlidePreset(type))

    newSlide.objects.forEach(obj => obj.id = uuid())
    newSlide.id = uuid()

    newSlide.background = theme.background
    const slideIds = editor.selection.selectedSlideIds || []
    if (slideIds.length == 0) return editor
    const selectedSlideIndex = editor.presentation.slides.findIndex(
        slide => slide.id == slideIds[slideIds.length - 1]
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
            selectedSlideIds: [newSlide.id],
            selectedObjectId: undefined,
        },
    }
}

function changeSlideBackground(
    slide: SlideType,
    {
        background
    }: {
        background: BackgroundType
    }
): SlideType {
    const slideCopy = deepCopy(slide)
    slideCopy.background = background
    return slideCopy
}

function deleteSlide(editor: EditorType): EditorType {
    if (editor.presentation.slides.length == 1) return editor
    const presentationCopy = deepCopy(editor.presentation)
    const slideIds = editor.selection.selectedSlideIds || []
    if (slideIds.length == 0) return editor
    const index = presentationCopy.slides.findIndex(slide => slide.id == slideIds[slideIds.length - 1])
    if (index === -1) return editor

    const updatedSlides = presentationCopy.slides.filter(s => slideIds.indexOf(s.id) == -1)

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
            selectedSlideIds: [newSelectedSlide.id],
            selectedObjectId: undefined,
        },
    }
}

function selectSlide(
    selection: SelectionType,
    selectedSlideId: string
): SelectionType {
    return {
        ...selection,
        selectedSlideIds: [selectedSlideId],
        selectedObjectId: undefined
    }
}

function changeAllSlidesBackground(
    slides: Array<SlideType>,
    background: BackgroundType
): Array<SlideType> {
    const slidesCopy = deepCopy(slides)
    slidesCopy.forEach(slide => slide.background = background)
    return slidesCopy
}

function selectSlidePreset(type: SlidePreset): SlideType {
    switch (type) {
        case 'none':
            return EMPTY_SLIDE()
        case 'image':
            return IMAGE_SLIDE()
        case 'title':
            return TITLE_SLIDE()
        case 'title&text':
            return TITLE_AND_TEXT_SLIDE()
        default:
            throw Error("Invalid slide start content type")
    }
}

function selectSlideBackgroundType(style: CSSProperties, background: BackgroundType): CSSProperties {
    switch (background.type) {
        case 'solid': {
            style.backgroundColor = background.value
            break
        }
        case 'image': {
            style.backgroundImage = `url('${background.value}')`
            break
        }
        case 'gradient': {
            style.background = createGradient(background)
            break
        }
    }

    return style
}

function selectSlides(
    selection: SelectionType,
    slideIds: Array<string>,
): SelectionType {
    return {
        ...selection,
        selectedObjectId: undefined,
        selectedSlideIds: slideIds
    }
}

export {
    addSlide,
    deleteSlide,
    selectSlide,
    selectSlides,
    changeSlideBackground,
    selectSlideBackgroundType,
    changeAllSlidesBackground,
}