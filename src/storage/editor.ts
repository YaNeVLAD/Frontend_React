/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BASE_PRESENTATION } from "../common/BasePresentation"
import { EMPTY_SLIDE } from "./../common/EmptySlide"
import { EditorType } from "./types"

let _editor: EditorType = {
    presentation: BASE_PRESENTATION,
    selection: {
        selectedSlide: EMPTY_SLIDE,
        selectedObject: undefined
    }
}

let presentationChangeHandler: Function | null = null

function addPresentationChangeHandler(handler: Function) {
    presentationChangeHandler = handler
}

function getEditor(): EditorType {
    return _editor
}

function setEditor(editor: EditorType) {
    _editor = editor
}

function dispatch(modifier: Function, params?: object) {
    const newPresentation = modifier(_editor, params)
    setEditor(newPresentation)
    if (presentationChangeHandler) presentationChangeHandler()
}

export {
    getEditor,
    setEditor,
    addPresentationChangeHandler,
    dispatch,
}