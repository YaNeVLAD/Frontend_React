import { changeFontFamily, changeFontSize, changeTextAlignment, changeTextColor, changeTextStyles, changeTextValue } from "../../actions/textAreaActions"
import { addObject, changeObjectBounds, deleteObject } from "../../actions/objectActions"
import { changeSlideBackground } from "../../actions/slideActions"
import { changeSrcValue } from "../../actions/imageActions"
import { deepCopy } from "../../utils/deepCopy"
import { Action } from "../actions/actions"
import { SlideType } from "../../types"

const initialState: SlideType = {
    id: '',
    preset: 'none',
    objects: [],
    background: { type: 'solid', value: '' },
    note: ''
}

const slideReducer = (state = initialState, action: Action): SlideType => {
    switch (action.type) {
        case 'CHANGE_TEXT_STYLE':
            return changeTextStyles(state, action.payload)
        case 'CHANGE_FONT_SIZE':
            return changeFontSize(state, action.payload)
        case 'CHANGE_TEXT_COLOR':
            return changeTextColor(state, action.payload)
        case 'CHANGE_FONT_FAMILY':
            return changeFontFamily(state, action.payload)
        case 'CHANGE_TEXT_ALIGNMENT':
            return changeTextAlignment(state, action.payload)
        case 'ADD_IMAGE':
            return { ...state, objects: [...state.objects, action.payload.object] }
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

