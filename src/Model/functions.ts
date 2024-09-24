import { type ImageSrc, type Presentation, type Slide, type TextArea, type SolidColor, type GradientColor, type GlobalSelection, Image } from "./types"

function changePresentationTitle(title: string, presentation: Presentation): Presentation {
    return {
        ...presentation,
        title: title
    }
}

function addSlide(slide: Slide, presentation: Presentation): Presentation {
    const slides: Array<Slide> = presentation.slides
    slides.push(slide)

    return {
        ...presentation,
        selection: {
            SelectedSlidesIds: [slide.id],
            SelectedObjectsIds: [],
        },
        slides: slides
    }
}

function deleteSlide(slide: Slide, presentation: Presentation): Presentation {
    if (presentation.selection.SelectedSlidesIds.indexOf(slide.id) == -1) {
        throw new Error('Can\'t delete slide that isn\'t selected')
    }

    if (presentation.slides.length == 1) {
        throw new Error('Can\'t delete last slide of the presentation')
    }

    const index: number = presentation.slides.indexOf(slide)
    if (index == -1) {
        throw new Error('Can\'t delete slide that isn\'t in presentation')
    }

    const modifiedSlides: Array<Slide> = presentation.slides
    modifiedSlides.splice(index, 1)

    return {
        ...presentation,
        slides: modifiedSlides,
        selection: {
            SelectedSlidesIds: [modifiedSlides[0].id],
            SelectedObjectsIds: []
        }
    }
}

function moveSlide(slideFrom: Slide, slideTo: Slide, presentation: Presentation): Presentation {
    if (presentation.selection.SelectedSlidesIds.indexOf(slideFrom.id) == -1) {
        throw new Error('Can\'t move slide that isn\'t selected')
    }

    const slides: Array<Slide> = presentation.slides
    
    const tmp = slideTo
    slideTo = slideFrom
    slideFrom = tmp

    return {
        ...presentation,
        slides: slides
    }
}

function changeSlideBackground(slide: Slide, newBackground: SolidColor | GradientColor | ImageSrc, selection: GlobalSelection): Slide {
    if (selection.SelectedSlidesIds.indexOf(slide.id) == -1) {
        throw new Error('Can\'t change background of slide that isn\'t selected')
    }

    return {
        ...slide,
        background: newBackground
    }
}

function addObject(slide: Slide, object: Image | TextArea, selection: GlobalSelection): Slide {
    if (selection.SelectedSlidesIds.indexOf(slide.id) == -1) {
        throw new Error('Can\'t change add objects on slide that isn\'t selected')
    }

    const modifiedObjects = slide.objects
    modifiedObjects.push(object)

    return {
        ...slide,
        objects: modifiedObjects
    }
}

function deleteObject(slide: Slide, object: Image | TextArea, selection: GlobalSelection): Slide {
    if (selection.SelectedSlidesIds.indexOf(slide.id) == -1) {
        throw new Error('Can\'t delete object on slide that isn\'t selected')
    }

    if (selection.SelectedObjectsIds.indexOf(object.id) == -1) {
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

function moveObject(slide: Slide, objectToMove: Image | TextArea, newX: number, newY: number, selection: GlobalSelection): Slide {
    if (selection.SelectedSlidesIds.indexOf(slide.id) == -1) {
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

function changeTextValue(textArea: TextArea, newValue: string, selection: GlobalSelection): TextArea {
    if (selection.SelectedObjectsIds.indexOf(textArea.id) == -1) {
        throw new Error('Can\'t change text value of area that isn\'t selected')
    }

    return {
        ...textArea,
        value: newValue
    }
}

function changeTextFont(textArea: TextArea, newFont: string, selection: GlobalSelection): TextArea {
    if (selection.SelectedObjectsIds.indexOf(textArea.id) == -1) {
        throw new Error('Can\'t change text font of area that isn\'t selected')
    }

    return {
        ...textArea,
        font: newFont
    }
}

function changeTextColor(textArea: TextArea, newColor: string, selection: GlobalSelection): TextArea {
    if (selection.SelectedObjectsIds.indexOf(textArea.id) == -1) {
        throw new Error('Can\'t change text color of area that isn\'t selected')
    }

    return {
        ...textArea,
        color: newColor
    }
}

function changeTextScale(textArea: TextArea, newSize: number, selection: GlobalSelection): TextArea {
    if (selection.SelectedObjectsIds.indexOf(textArea.id) == -1) {
        throw new Error('Can\'t change text size of area that isn\'t selected')
    }

    return {
        ...textArea,
        textSize: newSize
    }
}

function selectObject(selection: GlobalSelection, slideId: string, objectId: string): GlobalSelection {
    return {
        ...selection,
        SelectedSlidesIds: [slideId],
        SelectedObjectsIds: [objectId]
    }
}

function selectSlide(selection: GlobalSelection, slideId: string): GlobalSelection {
    return {
        ...selection,
        SelectedSlidesIds: [slideId],
        SelectedObjectsIds: []
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
    changePresentationTitle, addSlide, deleteSlide, moveSlide,
    addObject, deleteObject, moveObject, changeSlideBackground,
    changeTextValue, changeTextFont, changeTextScale, changeTextColor,
    selectObject, selectSlide,
    uuid
}