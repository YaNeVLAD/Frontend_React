/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BASE_PRESENTATION } from "../common/basePresentation"
import { EMPTY_SLIDE } from "../common/slides/emptySlide"
import { EditorType } from "./types"

let _editor: EditorType = {
    presentation: BASE_PRESENTATION,
    selection: {
        selectedSlide: EMPTY_SLIDE,
        selectedObject: undefined
    }
}

let editorChangeHandler: Function | null = null

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler
}

function getEditor(): EditorType {
    return _editor
}

function setEditor(editor: EditorType) {
    _editor = editor
}

function dispatch(modifier: Function, params?: object) {
    const newEditor = modifier(_editor, params)
    setEditor(newEditor)
    if (editorChangeHandler) editorChangeHandler()
}

export {
    getEditor,
    setEditor,
    addEditorChangeHandler,
    dispatch,
}