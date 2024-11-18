import { addSlide, changeSlideBackground, deleteSlide, moveSlide } from "../../actions/slideActions"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"

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
            return moveSlide(state, action.payload)
        default:
            return state
    }
}

export { slidesReducer }