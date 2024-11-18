import { viewModelReducer } from "./viewModelReducer"
import { editorReducer } from "./editorReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    editor: editorReducer,
    viewModel: viewModelReducer
})

export { rootReducer }