import { RootState } from "../redux/reducers/rootReducer"
import { PresentationType, SelectionType, ViewModel } from "../types"

const DATABASE_NAME = "EditorDatabase"
const DATABASE_VERSION = 1
const PRESENTATION_STORE = "presentation"
const SELECTION_STORE = "selection"
const VIEWMODEL_STORE = "viewModel"

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
            if (!db.objectStoreNames.contains(VIEWMODEL_STORE)) {
                db.createObjectStore(VIEWMODEL_STORE)
            }
        }

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function saveToDB(storeName: string, data: any): Promise<void> {
    const db = await openDatabase()
    const transaction = db.transaction(storeName, "readwrite")
    const store = transaction.objectStore(storeName)
    store.put(data, "data")

    return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
    })
}

async function getFromDB<T>(storeName: string): Promise<T | null> {
    const db = await openDatabase()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly")
        const store = transaction.objectStore(storeName)
        const request = store.get("data")

        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
    })
}

async function saveRootStateToDB(state: RootState): Promise<void> {
    await Promise.all([
        saveToDB(PRESENTATION_STORE, state.editor.presentation),
        saveToDB(SELECTION_STORE, state.editor.selection),
        saveToDB(VIEWMODEL_STORE, state.viewModel)
    ])
}

async function getRootStateFromDB(): Promise<RootState | null> {
    const [presentation, selection, viewModel] = await Promise.all([
        getFromDB<PresentationType>(PRESENTATION_STORE),
        getFromDB<SelectionType>(SELECTION_STORE),
        getFromDB<ViewModel>(VIEWMODEL_STORE)
    ])

    if (presentation && selection && viewModel) {
        return {
            editor: { presentation, selection },
            viewModel
        }
    }
    return null
}

export {
    saveRootStateToDB,
    getRootStateFromDB
}