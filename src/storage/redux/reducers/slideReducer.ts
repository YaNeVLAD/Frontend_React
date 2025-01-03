import { addObject, changeObjectBounds, deleteObject } from "../../actions/objectActions"
import { changeSlideBackground } from "../../actions/slideActions"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"
import { changeSrcValue } from "../../actions/imageActions"
import { deepCopy } from "../../utils/deepCopy"
import { changeTextValue } from "../../actions/textAreaActions"

const initialState: SlideType = {
    id: '',
    preset: 'none',
    objects: [],
    background: { type: 'solid', value: '' },
    note: ''
}

const slideReducer = (state = initialState, action: Action): SlideType => {
    switch (action.type) {
        case 'CHANGE_TEXT_VALUE':
            return changeTextValue(state, action.payload)
        case 'CHANGE_SLIDE_NOTE':
            return { ...deepCopy(state), note: action.payload.note }
        case 'CHANGE_SLIDE_BACKGROUND':
            return changeSlideBackground(state, action.payload)
        case 'CHANGE_OBJECT_BOUNDS':
            return changeObjectBounds(state, action.payload)
        case 'CHANGE_SRC_VALUE':
            return changeSrcValue(state, action.payload)
        case 'ADD_OBJECT':
            return addObject(state, action.payload)
        case 'DELETE_OBJECT':
            return deleteObject(state, action.payload)
        default:
            return state
    }
}

export { slideReducer }