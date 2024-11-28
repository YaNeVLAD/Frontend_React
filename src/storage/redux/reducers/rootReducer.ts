import { viewModelReducer } from "./viewModelReducer"
import { EditorType, ViewModel } from "../../types"
import { editorReducer } from "./editorReducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    editor: editorReducer,
    viewModel: viewModelReducer
})

export type RootState = {
    editor: EditorType,
    viewModel: ViewModel
}
export { rootReducer }