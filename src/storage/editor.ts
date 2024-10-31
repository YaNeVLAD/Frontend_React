/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BASE_EDITOR } from "../common/baseEditor"
import { deepCopy } from "./deepCopy"
import { EditorType } from "./types"

const EDITOR_LOCALE_STORAGE_KEY = "editor"

let _editor: EditorType = initEditor()

let editorChangeHandler: Function | undefined

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler
}

function getEditor(): EditorType {
    return _editor
}

function setEditor(editor: EditorType) {
    _editor = editor
    localStorage.setItem(EDITOR_LOCALE_STORAGE_KEY, JSON.stringify(editor))
}

function initEditor() {
    const savedData = localStorage.getItem(EDITOR_LOCALE_STORAGE_KEY)
    return savedData ? JSON.parse(savedData) : deepCopy(BASE_EDITOR)
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