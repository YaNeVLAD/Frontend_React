/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { getEditorFromDB, saveEditorToDB } from "./utils/indexedDB"
import { validatePresentation } from "./file/validation/ajv"
import { BASE_EDITOR } from "../common/baseEditor"
import { deepCopy } from "./utils/deepCopy"
import { EditorType } from "./types"

let editorChangeHandler: Function | undefined

let _editor: EditorType
await initEditor()

async function initEditor() {
    let savedEditor = await getEditorFromDB()
    if (savedEditor == null || !validatePresentation(savedEditor.presentation)) {
        alert("Что-то пошло не так. Ваша презентация была утеряна")
        savedEditor = deepCopy(BASE_EDITOR)
    }
    _editor = savedEditor
}

function getEditor(): EditorType {
    return _editor
}

async function setEditor(editor: EditorType) {
    _editor = editor
    await saveEditorToDB(editor)
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler
}

async function dispatch(modifier: Function, params?: object) {
    const newEditor = modifier(_editor, params)
    await setEditor(newEditor)
    if (editorChangeHandler) editorChangeHandler()
}

export {
    getEditor,
    setEditor,
    addEditorChangeHandler,
    dispatch,
    initEditor,
}
