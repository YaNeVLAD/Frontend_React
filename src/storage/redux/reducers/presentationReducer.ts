import { combineReducers } from "redux"
import { titleReducer } from "./titleReducer"
import { slidesReducer } from "./slidesReducert"

const presentationReducer = combineReducers({
    title: titleReducer,
    slides: slidesReducer,
})

export { presentationReducer }