import { deepCopy } from "../../utils/deepCopy"
import { slideReducer } from "./slideReducer"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"
import { changeAllSlidesBackground } from "../../actions/slideActions"

const initialState: Array<SlideType> = []

const slidesReducer = (state = initialState, action: Action): Array<SlideType> => {
    switch (action.type) {
        case 'ADD_OBJECT':
        case 'DELETE_OBJECT':
        case 'CHANGE_SRC_VALUE':
        case 'CHANGE_SLIDE_NOTE':
        case 'CHANGE_TEXT_VALUE':
        case 'CHANGE_OBJECT_BOUNDS':
        case 'CHANGE_SLIDE_BACKGROUND':
            return state.map(slide =>
                slide.id == action.payload.selectedSlideId
                    ? slideReducer(slide, action)
                    : slide
            )
        case 'MOVE_SLIDE':
            return deepCopy(action.payload)
        case 'CHANGE_ALL_SLIDES_BACKGROUND':
            return changeAllSlidesBackground(state, action.payload)
        default:
            return state
    }
}

export { slidesReducer }