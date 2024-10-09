import { BASE_IMAGE } from "../common/BaseImage"
import { BASE_TEXT_AREA } from "../common/BaseTextArea"
import { EMPTY_SLIDE } from "../common/EmptySlide"
import { deepCopy } from "./deepCopy"
import { type ImageSrc, type PresentationType, type SlideType, type TextAreaType, type SolidColor, type GradientColor, type GlobalSelectionType, ImageType, SlideObjectType } from "./types"

function changePresentationTitle(presentation: PresentationType, { title }: { title: string }): PresentationType {
    return {
        ...presentation,
        title: title
    }
}

function addSlide(presentation: PresentationType): PresentationType {
    const presentationCopy: PresentationType = deepCopy(presentation)

    const newSlide = deepCopy(EMPTY_SLIDE)
    newSlide.id = uuid()

    const updatedSlides = [
        ...presentationCopy.slides,
        newSlide,
    ]

    return {
        ...presentationCopy,
        slides: updatedSlides,
        selection: {
            selectedSlide: newSlide,
            selectedObject: undefined,
        },
    }
}

function deleteSlide(presentation: PresentationType): PresentationType {
    if (presentation.slides.length === 1) return presentation

    const presentationCopy = deepCopy(presentation)

    const index = presentationCopy.slides.findIndex(slide => slide.id === presentationCopy.selection.selectedSlide.id)

    if (index === -1) return presentation

    const updatedSlides = presentationCopy.slides.filter((_, i) => i !== index)

    let newSelectedSlide = updatedSlides[updatedSlides.length - 1]
    if (index < updatedSlides.length) {
        newSelectedSlide = updatedSlides[index]
    }

    return {
        ...presentationCopy,
        slides: updatedSlides,
        selection: {
            selectedSlide: newSelectedSlide,
            selectedObject: undefined,
        },
    }
}

function changeSlideBackground(presentation: PresentationType, { background }: { background: ImageSrc | SolidColor | GradientColor }): PresentationType {
    const presentationCopy: PresentationType = deepCopy(presentation)

    const selectedSlide = presentationCopy.slides.find((slide) => {
        if (slide.id == presentationCopy.selection.selectedSlide.id) return slide
    })

    if (selectedSlide == undefined) return presentation

    selectedSlide.background = background

    return {
        ...presentationCopy,
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: undefined
        }
    }
}

function addObject(presentation: PresentationType, { type }: { type: 'imageObj' | 'textObj' }): PresentationType {
    const presentationCopy: PresentationType = deepCopy(presentation)

    const selectedSlide = presentationCopy.slides.find(slide => slide.id === presentationCopy.selection.selectedSlide.id)

    if (selectedSlide == undefined) return presentation

    let newObject
    if (type === 'imageObj') {
        newObject = deepCopy(BASE_IMAGE)
    } else {
        newObject = deepCopy(BASE_TEXT_AREA)
    }
    newObject.id = uuid()

    selectedSlide.objects.push(newObject)

    return {
        ...presentationCopy,
        selection: {
            selectedSlide: selectedSlide
        },
    }
}

function deleteObject(presentation: PresentationType): PresentationType {
    if (presentation.selection.selectedObject == undefined) return presentation

    const presentationCopy: PresentationType = deepCopy(presentation)

    const selectedSlide = presentationCopy.slides.find((slide) => {
        if (slide.id == presentationCopy.selection.selectedSlide.id) return slide
    })

    if (selectedSlide == undefined) return presentation

    const selectedObjectIndex = selectedSlide.objects.findIndex((obj) => {
        return obj.id == presentation.selection.selectedObject?.id
    })

    if (selectedObjectIndex === -1) return presentation

    selectedSlide.objects.splice(selectedObjectIndex, 1)

    return {
        ...presentationCopy,
        selection: {
            ...presentationCopy.selection,
            selectedSlide: selectedSlide,
            selectedObject: undefined,
        },
    }
}

function selectObject(presentation: PresentationType, { id }: { id: string }): PresentationType {
    const object = presentation.selection.selectedSlide.objects.find((object: SlideObjectType): boolean => { return object.id == id })
    if (object == undefined) {
        return presentation
    }
    return {
        ...presentation,
        selection: {
            selectedSlide: presentation.selection.selectedSlide,
            selectedObject: object
        }
    }
}

function selectSlide(presentation: PresentationType, { id }: { id: string }): PresentationType {
    const slide = presentation.slides.find((slide: SlideType): boolean => { return slide.id == id })
    if (slide == undefined) {
        return presentation
    }

    return {
        ...presentation,
        selection: {
            selectedSlide: slide,
            selectedObject: undefined
        }
    }
}

function moveSlide(slideFrom: SlideType, slideTo: SlideType, presentation: PresentationType): PresentationType {
    if (presentation.selection.selectedSlide != slideFrom) {
        throw new Error('Can\'t move slide that isn\'t selected')
    }

    const slides = presentation.slides

    const tmp = slideTo
    slideTo = slideFrom
    slideFrom = tmp

    return {
        ...presentation,
        slides: slides
    }
}

function moveObject(slide: SlideType, objectToMove: ImageType | TextAreaType, newX: number, newY: number, selection: GlobalSelectionType): SlideType {
    if (selection.selectedObject != objectToMove) {
        throw new Error('Can\'t move slide that isn\'t selected')
    }

    const objects = slide.objects
    const index: number = objects.indexOf(objectToMove)

    if (index == -1) {
        throw new Error('Object doen\'t exist on this slide')
    }

    objects.splice(index, 1)

    objectToMove.pos.x = newX
    objectToMove.pos.y = newY

    objects.push(objectToMove)

    return {
        ...slide,
        objects: objects
    }
}

function changeTextValue(textArea: TextAreaType, newValue: string, selection: GlobalSelectionType): TextAreaType {
    if (selection.selectedObject != textArea) {
        throw new Error('Can\'t change text value of area that isn\'t selected')
    }

    return {
        ...textArea,
        value: newValue
    }
}

function changeTextFont(textArea: TextAreaType, newFont: string, selection: GlobalSelectionType): TextAreaType {
    if (selection.selectedObject != textArea) {
        throw new Error('Can\'t change text font of area that isn\'t selected')
    }

    return {
        ...textArea,
        font: newFont
    }
}

function changeTextColor(textArea: TextAreaType, newColor: string, selection: GlobalSelectionType): TextAreaType {
    if (selection.selectedObject != textArea) {
        throw new Error('Can\'t change text color of area that isn\'t selected')
    }

    return {
        ...textArea,
        color: newColor
    }
}

function changeTextScale(textArea: TextAreaType, newSize: number, selection: GlobalSelectionType): TextAreaType {
    if (selection.selectedObject != textArea) {
        throw new Error('Can\'t change text size of area that isn\'t selected')
    }

    return {
        ...textArea,
        textSize: newSize
    }
}

function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export {
    changePresentationTitle,
    addSlide,
    deleteSlide,
    moveSlide,
    addObject,
    deleteObject,
    moveObject,
    changeSlideBackground,
    changeTextValue,
    changeTextFont,
    changeTextScale,
    changeTextColor,
    selectObject,
    selectSlide,
    uuid
}