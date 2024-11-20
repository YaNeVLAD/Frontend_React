import { applyMiddleware, legacy_createStore as createStore, Middleware } from 'redux'
import { getRootStateFromDB, saveRootStateToDB } from "../utils/indexedDB"
import { rootReducer, RootState } from "./reducers/rootReducer"
import { BaseEditor } from "../../common/BaseEditor"
import { BaseViewModel } from '../../common/BaseViewModel'

const loadStateFromIndexedDB = async (): Promise<RootState> => {
    try {
        const savedState = await getRootStateFromDB()
        if (savedState) {
            return savedState
        }
    } catch (error) {
        console.error("Failed to load state from IndexedDB:", error)
    }
    return { editor: BaseEditor(), viewModel: BaseViewModel() }
}

const saveToIndexedDBMiddleware: Middleware = store => next => action => {
    const result = next(action)

    const state = store.getState()
    saveRootStateToDB(state)

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