import { editorReducer } from "./editorReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    editor: editorReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export { rootReducer }