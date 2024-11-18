import { presentationReducer } from "./presentationReducer"
import { selectionReducer } from "./selectionReducer"
import { combineReducers } from "redux"

const editorReducer = combineReducers({
    presentation: presentationReducer,
    selection: selectionReducer,
})

export { editorReducer }