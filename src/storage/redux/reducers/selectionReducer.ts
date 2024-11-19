import { deselectAllObjects, selectObject } from "../../actions/objectActions"
import { selectSlide } from "../../actions/slideActions"
import { SelectionType } from "../../types"
import { Action } from "../actions/actions"

const initialState: SelectionType = {
    selectedSlideId: '',
    selectedObjectId: undefined
}

const selectionReducer = (state = initialState, action: Action): SelectionType => {
    switch (action.type) {
        case 'SELECT_SLIDE':
            return selectSlide(state, action.payload)
        case 'SELECT_OBJECT':
            return selectObject(state, action.payload)
        case 'DESELECT_OBJECT':
            return deselectAllObjects(state)
        default:
            return state
    }
}

export { selectionReducer }