import { themeReducer } from "./themeReducer"
import { combineReducers } from "redux"

const viewModelReducer = combineReducers({
    slideTheme: themeReducer,
})

export { viewModelReducer }