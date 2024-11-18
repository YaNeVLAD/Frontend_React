import { combineReducers } from "redux"
import { scaleReducer } from "./scaleReducer"

const viewModelReducer = combineReducers({
    scale: scaleReducer
})

export { viewModelReducer }