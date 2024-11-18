import { applyMiddleware, legacy_createStore as createStore, Middleware } from "redux"
import { getEditorFromDB, saveEditorToDB } from "../utils/indexedDB"
import { BASE_EDITOR } from "../../common/baseEditor"
import { rootReducer } from "./reducers/rootReducer"
import { deepCopy } from "../utils/deepCopy"
import { EditorType } from "../types"

const loadStateFromIndexedDB = async (): Promise<{ editor?: EditorType }> => {
    try {
        const savedEditor = await getEditorFromDB()
        if (savedEditor) {
            return { editor: savedEditor }
        }
    } catch (error) {
        console.error('Failed to load state from IndexedDB:', error)
    }
    return { editor: deepCopy(BASE_EDITOR) }
}

const saveToIndexedDBMiddleware: Middleware = store => next => action => {
    const result = next(action)

    const state = store.getState()
    if (state.editor) {
        saveEditorToDB(state.editor)
    }

    return result
}

const configureStore = async () => {
    const initialState = await loadStateFromIndexedDB()
    console.log(initialState)
    
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(saveToIndexedDBMiddleware)
    )

    return store
}

export default configureStore
