// import { parsePresentationFromJson, parseSelectionFromJson } from "../file/parse"
import { EditorType, PresentationType, SelectionType } from "../types"

const DATABASE_NAME = "EditorDatabase"
const DATABASE_VERSION = 1
const PRESENTATION_STORE = "presentation"
const SELECTION_STORE = "selection"

function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains(PRESENTATION_STORE)) {
                db.createObjectStore(PRESENTATION_STORE)
            }
            if (!db.objectStoreNames.contains(SELECTION_STORE)) {
                db.createObjectStore(SELECTION_STORE)
            }
        }

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}


async function savePresentationToDB(presentation: PresentationType): Promise<void> {
    const db = await openDatabase()
    const transaction = db.transaction(PRESENTATION_STORE, "readwrite")
    const store = transaction.objectStore(PRESENTATION_STORE)
    store.put(presentation, "data")

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
    })
}

async function saveSelectionToDB(selection: SelectionType): Promise<void> {
    const db = await openDatabase()
    const transaction = db.transaction(SELECTION_STORE, "readwrite")
    const store = transaction.objectStore(SELECTION_STORE)
    store.put(selection, "data")

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
    })
}

async function saveEditorToDB(editor: EditorType): Promise<void> {
    await savePresentationToDB(editor.presentation)
    await saveSelectionToDB(editor.selection)
}

async function getEditorFromDB(): Promise<EditorType | null> {
    const db = await openDatabase()

    const presentationData = await new Promise<PresentationType | undefined>((resolve, reject) => {
        const transaction = db.transaction(PRESENTATION_STORE, "readonly")
        const store = transaction.objectStore(PRESENTATION_STORE)
        const request = store.get("data")

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })

    const selectionData = await new Promise<SelectionType | undefined>((resolve, reject) => {
        const transaction = db.transaction(SELECTION_STORE, "readonly")
        const store = transaction.objectStore(SELECTION_STORE)
        const request = store.get("data")

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })

    if (!presentationData || !selectionData) return null

    // const parsedPresentation = parsePresentationFromJson(presentationData)
    // const parsedSelection = parseSelectionFromJson(selectionData)

    return { presentation: presentationData, selection: selectionData }
}

export {
    saveEditorToDB,
    getEditorFromDB
}