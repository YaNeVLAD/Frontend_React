import { themeReducer } from "./themeReducer"
import { scaleReducer } from "./scaleReducer"
import { combineReducers } from "redux"

const viewModelReducer = combineReducers({
    scale: scaleReducer,
    slideTheme: themeReducer,
})

export { viewModelReducer }