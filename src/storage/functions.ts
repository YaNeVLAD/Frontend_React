import { EMPTY_SLIDE } from "../common/EmptySlide"
import { type ImageSrc, type PresentationType, type SlideType, type TextAreaType, type SolidColor, type GradientColor, type GlobalSelectionType, ImageType, SlideObjectType } from "./types"

function changePresentationTitle(title: string, presentation: PresentationType): PresentationType {
    return {
        ...presentation,
        title: title
    }
}
//Нужно деструкторизировать презентацию и слайды во всех функциях
function addSlide(presentation: PresentationType): PresentationType {
    const presentationCopy = { ...presentation }
    const slides = presentationCopy.slides
    const newSlide = {
        ...EMPTY_SLIDE,
        id: uuid()
    }
    slides.push(newSlide)

    return {
        ...presentationCopy,
        slides: slides,
        selection: {
            selectedSlide: newSlide,
            selectedObject: undefined,
        }
    }
}

function deleteSlide(presentation: PresentationType): PresentationType {
    if (presentation.slides.length == 1) {
        return presentation
    }

    const index = presentation.slides.indexOf(presentation.selection.selectedSlide)
    if (index == -1) {
        return presentation
    }

    const presentationCopy = { ...presentation }
    const slides = presentationCopy.slides
    slides.splice(index, 1)

    return {
        ...presentationCopy,
        slides: slides,
        selection: {
            selectedSlide: slides[slides.length - 1],
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

function changeSlideBackground(slide: SlideType, newBackground: SolidColor | GradientColor | ImageSrc, selection: GlobalSelectionType): SlideType {
    if (selection.selectedSlide != slide) {
        throw new Error('Can\'t change background of slide that isn\'t selected')
    }

    return {
        ...slide,
        background: newBackground
    }
}

function addObject(slide: SlideType, object: ImageType | TextAreaType, selection: GlobalSelectionType): SlideType {
    if (selection.selectedSlide != slide) {
        throw new Error('Can\'t change add objects on slide that isn\'t selected')
    }

    const modifiedObjects = slide.objects
    modifiedObjects.push(object)

    return {
        ...slide,
        objects: modifiedObjects
    }
}

function deleteObject(slide: SlideType, object: ImageType | TextAreaType, selection: GlobalSelectionType): SlideType {
    if (selection.selectedSlide != slide) {
        throw new Error('Can\'t delete object on slide that isn\'t selected')
    }

    if (selection.selectedObject != object) {
        throw new Error('Can\'t delete object that isn\'t selected')
    }

    const modifiedObjects = slide.objects
    const index: number = modifiedObjects.indexOf(object)

    if (index == -1) {
        throw new Error('Object doen\'t exist on this slide')
    }

    modifiedObjects.splice(index, 1)

    return {
        ...slide,
        objects: modifiedObjects
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