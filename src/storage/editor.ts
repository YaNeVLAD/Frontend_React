/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { getEditorFromStorage, saveEditorToStorage } from "./localStorage"
import { BASE_EDITOR } from "../common/baseEditor"
import { deepCopy } from "./deepCopy"
import { EditorType } from "./types"
import { validatePresentation } from "./file/validate"

let editorChangeHandler: Function | undefined

let _editor: EditorType = initEditor()

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler
}

function getEditor(): EditorType {
    return _editor
}

function setEditor(editor: EditorType) {
    _editor = editor
    saveEditorToStorage(editor)
}

function initEditor(): EditorType {
    let savedEditor = getEditorFromStorage()
    if (savedEditor == null || !validatePresentation(savedEditor.presentation)) {
        alert("Что-то пошло не так. Ваша презентация была утеряня")
        savedEditor = deepCopy(BASE_EDITOR)
    }

    return savedEditor
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