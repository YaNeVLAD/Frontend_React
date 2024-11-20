import { viewModelReducer } from "./viewModelReducer"
import { editorReducer } from "./editorReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    editor: editorReducer,
    viewModel: viewModelReducer
})

export type RootState = ReturnType<typeof rootReducer>
export { rootReducer }