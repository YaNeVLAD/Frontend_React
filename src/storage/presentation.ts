/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { EMPTY_SLIDE } from "../common/EmptySlide"
import { PresentationType } from "./types"

let presentation: PresentationType = {
    title: "My Presentation",
    slides: [{
        ...EMPTY_SLIDE,
        objects: [...EMPTY_SLIDE.objects],
        background: { ...EMPTY_SLIDE.background }
    }],
    selection: {
        selectedSlide: {
            ...EMPTY_SLIDE,
            objects: [...EMPTY_SLIDE.objects],
            background: { ...EMPTY_SLIDE.background }
        },
        selectedObject: undefined
    }
}

let presentationChangeHandler: Function | null = null

function addPresentationChangeHandler(handler: Function) {
    presentationChangeHandler = handler
}

function getPresentation(): PresentationType {
    return presentation
}

function setPresentation(newPresentation: PresentationType) {
    presentation = newPresentation
}

function dispatch(modifier: Function, params: object) {
    const newPresentation = modifier(presentation, params)
    setPresentation(newPresentation)
    if (presentationChangeHandler) {
        presentationChangeHandler()
    }
}

export {
    getPresentation,
    setPresentation,
    addPresentationChangeHandler,
    dispatch,
}