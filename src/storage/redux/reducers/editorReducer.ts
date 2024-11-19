import { addSlide, deleteSlide } from "../../actions/slideActions"
import { presentationReducer } from "./presentationReducer"
import { BaseEditor } from "../../../common/BaseEditor"
import { selectionReducer } from "./selectionReducer"
import { Action } from "../actions/actions"
import { EditorType } from "../../types"
import { combineReducers } from "redux"

const initialState: EditorType = BaseEditor()

const combinedEditorReducers = combineReducers({
    presentation: presentationReducer,
    selection: selectionReducer,
})

const editorReducer = (state = initialState, action: Action): EditorType => {
    switch (action.type) {
        case 'ADD_SLIDE':
            return addSlide(state, action.payload)
        case 'DELETE_SLIDE':
            return deleteSlide(state)
        default:
            return combinedEditorReducers(state, action)
    }
}

export { editorReducer }