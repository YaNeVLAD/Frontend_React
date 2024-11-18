import { addSlide, changeSlideBackground, deleteSlide } from "../../actions/slideActions"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"
import { addObject, moveObject } from "../../actions/objectActions"
import { deepCopy } from "../../utils/deepCopy"

const initialState: Array<SlideType> = []

const slidesReducer = (state = initialState, action: Action): Array<SlideType> => {
    switch (action.type) {
        case 'ADD_SLIDE':
            return addSlide(state, action.payload)
        case 'CHANGE_SLIDE_BACKGROUND':
            return changeSlideBackground(state, action.payload)
        case 'DELETE_SLIDE':
            return deleteSlide(state, action.payload)
        case 'MOVE_SLIDE':
            return deepCopy(action.payload)
        case 'MOVE_OBJECT':
            return moveObject(state, action.payload)
        case 'ADD_OBJECT':
            return addObject(state, action.payload)

        default:
            return state
    }
}

export { slidesReducer }