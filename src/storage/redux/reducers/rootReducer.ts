import { viewModelReducer } from "./viewModelReducer"
import { editorReducer } from "./editorReducer"
import { combineReducers } from "redux"
import { Action } from "../actions/actions"
import { EditorType, ViewModel } from "../../types"
import { BASE_EDITOR } from "../../../common/BaseEditor"
import { BASE_VIEWMODEL } from "../../../common/BaseViewModel"

const initialState: RootState = {
    editor: BASE_EDITOR(),
    viewModel: BASE_VIEWMODEL()
}

const combinedRootReducers = combineReducers({
    editor: editorReducer,
    viewModel: viewModelReducer
})

const rootReducer = (state = initialState, action: Action): RootState => {
    switch (action.type) {
        case 'SET_STATE':
            return action.payload

        default:
            return combinedRootReducers(state, action)
    }
}

export type RootState = {
    editor: EditorType,
    viewModel: ViewModel
}
export { rootReducer }