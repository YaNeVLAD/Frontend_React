import { BackgroundType, SelectionType, SlidePreset, SlideType } from "../types"
import { TitleAndImageSlide } from "../../common/Slides/TitleAndImageSlide"
import { TitleAndTextSlide } from "../../common/Slides/TitleAndTextSlide"
import { EmptySlide } from "../../common/Slides/EmptySlide"
import { ImageSlide } from "../../common/Slides/ImageSlide"
import { TitleSlide } from "../../common/Slides/TitleSlide"
import { deepCopy } from "../utils/deepCopy"
import { uuid } from "../utils/functions"
import { CSSProperties } from "react"

function addSlide(
    slides: Array<SlideType>,
    {
        selectedSlideId,
        type,
        prev
    }: {
        selectedSlideId?: string,
        type: SlidePreset,
        prev: boolean
    },
): Array<SlideType> {
    if (selectedSlideId == undefined) {
        return [TitleSlide()]
    }

    const newSlide =
        prev && slides.length == 1
            ? selectSlidePreset('title&text')
            : selectSlidePreset(type)

    newSlide.objects.forEach(obj => obj.id = uuid())
    newSlide.id = uuid()

    const selectedSlideIndex = slides.findIndex(
        slide => slide.id == selectedSlideId
    )
    if (selectedSlideIndex == -1) return slides

    const before = slides.slice(0, selectedSlideIndex + 1)
    const after = slides.slice(selectedSlideIndex + 1, slides.length)

    const updatedSlides = before.concat([newSlide], after)

    return updatedSlides
}

function changeSlideBackground(
    slides: Array<SlideType>,
    { selectedSlideId, background }: { selectedSlideId: string, background: BackgroundType }
): Array<SlideType> {
    const slidesCopy = deepCopy(slides)

    const selectedSlide = slidesCopy.find(slide =>
        slide.id == selectedSlideId
    )
    if (selectedSlide == undefined) return slidesCopy

    selectedSlide.background = background

    return slidesCopy
}

function deleteSlide(
    slides: Array<SlideType>,
    selectedSlideId: string
): Array<SlideType> {
    if (slides.length == 1) return slides

    const slidesCopy = deepCopy(slides)

    const index = slidesCopy.findIndex(slide => slide.id == selectedSlideId)
    if (index == -1) return slides

    const updatedSlides = slidesCopy.filter((_, i) => i !== index)

    return updatedSlides
}

function selectSlide(
    selection: SelectionType,
    selectedSlideId: string
): SelectionType {
    return {
        ...selection,
        selectedSlideId: selectedSlideId,
        selectedObjectId: undefined
    }
}

function selectSlidePreset(type: SlidePreset): SlideType {
    switch (type) {
        case 'none':
            return EmptySlide()
        case 'image':
            return ImageSlide()
        case 'title':
            return TitleSlide()
        case 'title&image':
            return TitleAndImageSlide()
        case 'title&text':
            return TitleAndTextSlide()
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
    selectSlide,
    selectSlideBackgroundType
}