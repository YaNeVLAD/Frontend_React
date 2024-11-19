import { applyMiddleware, legacy_createStore as createStore, Middleware } from 'redux'
import { getEditorFromDB, saveEditorToDB } from "../utils/indexedDB"
import { rootReducer, RootState } from "./reducers/rootReducer"
import { BaseEditor } from "../../common/BaseEditor"

const loadStateFromIndexedDB = async (): Promise<RootState> => {
    try {
        const savedEditor = await getEditorFromDB()
        if (savedEditor) {
            return { editor: savedEditor }
        }
    } catch (error) {
        console.error("Failed to load state from IndexedDB:", error)
    }
    return { editor: BaseEditor() }
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
        initialState as unknown as Partial<{ editor: never; }>,
        applyMiddleware(saveToIndexedDBMiddleware)
    )

    return store
}

export default configureStore