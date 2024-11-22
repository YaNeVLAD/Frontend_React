import { addObject, deleteObject, moveObject, resizeObject } from "../../actions/objectActions"
import { changeSlideBackground } from "../../actions/slideActions"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"

const initialState: SlideType = {
    id: '',
    preset: 'none',
    objects: [],
    background: { type: 'solid', value: '' }
}

const slideReducer = (state = initialState, action: Action): SlideType => {
    switch (action.type) {
        case 'CHANGE_SLIDE_BACKGROUND':
            return changeSlideBackground(state, action.payload)
        case 'MOVE_OBJECT':
            return moveObject(state, action.payload)
        case 'RESIZE_OBJECT':
            return resizeObject(state, action.payload)
        case 'ADD_OBJECT':
            return addObject(state, action.payload)
        case 'DELETE_OBJECT':
            return deleteObject(state, action.payload)
        default:
            return state
    }
}

export { slideReducer }