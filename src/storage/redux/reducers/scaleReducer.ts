import { Action } from "../actions/actions"

const initialState: number = 1

const scaleReducer = (state = initialState, action: Action): number => {
    switch (action.type) {
        case 'CHANGE_SCALE':
            return action.payload

        default:
            return state
    }
}

export { scaleReducer }