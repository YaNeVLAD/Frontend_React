import { type PresentationType, type SlideType, type TextAreaType, ImageType } from "./types"
//Разнести функции на файлы

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
    moveSlide,
    moveObject,
    changeTextFont,
    changeTextScale,
    changeTextColor,
    uuid
}