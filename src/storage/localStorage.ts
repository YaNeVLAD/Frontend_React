import { parsePresentationFromJson, parseSelectionFromJson } from "./file/parse"
import { EditorType, PresentationType, SelectionType } from "./types"

const PRESENTATION_LOCALE_STORAGE_KEY = "presentation"
const SELECTION_LOCALE_STORAGE_KEY = "selection"

function saveSelectionToStorage(selection: SelectionType) {
    localStorage.setItem(SELECTION_LOCALE_STORAGE_KEY, JSON.stringify(selection))
}

function savePresentationToStorage(presentation: PresentationType) {
    localStorage.setItem(PRESENTATION_LOCALE_STORAGE_KEY, JSON.stringify(presentation))
}

function saveEditorToStorage(editor: EditorType) {
    savePresentationToStorage(editor.presentation)
    saveSelectionToStorage(editor.selection)
}

function getEditorFromStorage(): EditorType | null {
    const savedPresentationJson = localStorage.getItem(PRESENTATION_LOCALE_STORAGE_KEY)
    const savedSelectionJson = localStorage.getItem(SELECTION_LOCALE_STORAGE_KEY)
    if (savedPresentationJson == null || savedSelectionJson == null) return null

    const parsedPresentation = parsePresentationFromJson(savedPresentationJson)
    const parsedSelection = parseSelectionFromJson(savedSelectionJson)
    if (parsedPresentation == null || parsedSelection == null) return null

    return {
        presentation: parsedPresentation,
        selection: parsedSelection
    }
}

export {
    saveEditorToStorage,
    getEditorFromStorage
}