import { slidesReducer } from "./slidesReducert"
import { deepCopy } from "../../utils/deepCopy"
import { PresentationType } from "../../types"
import { titleReducer } from "./titleReducer"
import { Action } from "../actions/actions"
import { combineReducers } from "redux"

const initialState: PresentationType = {
    id: '',
    author: '',
    title: '',
    slides: [],
}

const combinedPresentationReducers = combineReducers({
    id: (state: string = "", action: Action): string => {
        switch (action.type) {
            case 'CHANGE_PRESENTATION_ID':
                return action.payload
            default:
                return state
        }
    },
    author: (state: string = "", action: Action): string => {
        switch (action.type) {
            case 'CHANGE_PRESENTATION_AUTHOR':
                return action.payload
            default:
                return state
        }
    },
    title: titleReducer,
    slides: slidesReducer,
})

const presentationReducer = (
    state: PresentationType = initialState,
    action: Action
): PresentationType => {
    switch (action.type) {
        case 'UPDATE_PRESENTATION':
            return deepCopy(action.payload)
        default:
            return combinedPresentationReducers(state, action)
    }
}

export { presentationReducer }