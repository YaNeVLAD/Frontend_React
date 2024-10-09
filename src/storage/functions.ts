import { type PresentationType, type SlideType, type TextAreaType, ImageType, Background, EditorType } from "./types"
import { EMPTY_SLIDE } from "./../common/EmptySlide"
import { deepCopy } from "./deepCopy"
import { BASE_IMAGE } from "../common/BaseImage"
import { BASE_TEXT_AREA } from "../common/BaseTextArea"
//Разнести функции на файлы

function changePresentationTitle(
    editor: EditorType,
    { title }: { title: string }
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: title
        }
    }
}

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

function changeSlideBackground(
    editor: EditorType,
    { background }: { background: Background }
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
            selectedObject: undefined
        }
    }
}

function addObject(
    editor: EditorType,
    { type }: { type: 'imageObj' | 'textObj' }
): EditorType {
    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(slide => slide.id == editor.selection.selectedSlide.id)
    if (selectedSlide == undefined) return editor

    let newObject
    if (type === 'imageObj') {
        newObject = deepCopy(BASE_IMAGE)
    } else {
        newObject = deepCopy(BASE_TEXT_AREA)
    }
    newObject.id = uuid()

    selectedSlide.objects.push(newObject)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlide: selectedSlide
        },
    }
}

function deleteObject(editor: EditorType): EditorType {
    if (editor.selection.selectedObject == undefined) return editor

    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(slide =>
        slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    const selectedObjectIndex = selectedSlide.objects.findIndex(obj =>
        obj.id == editor.selection.selectedObject?.id
    )
    if (selectedObjectIndex === -1) return editor

    selectedSlide.objects.splice(selectedObjectIndex, 1)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: undefined,
        },
    }
}

function selectObject(editor: EditorType, { id }: { id: string }): EditorType {
    const object = editor.selection.selectedSlide.objects.find(object => object.id == id)
    if (object == undefined) return editor

    return {
        ...editor,
        selection: {
            selectedSlide: editor.selection.selectedSlide,
            selectedObject: object
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