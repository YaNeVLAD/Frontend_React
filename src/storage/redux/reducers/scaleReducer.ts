import { Action } from "../actions/actions"

const initialState: string = ''

const scaleReducer = (state = initialState, action: Action): string => {
    switch (action.type) {
        case 'CHANGE_SCALE':
            return action.payload
        default:
            return state
    }
}

export { scaleReducer }