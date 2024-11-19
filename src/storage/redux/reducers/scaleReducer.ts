import { Action } from "../actions/actions"

const initialState: number = 1

const scaleReducer = (state = initialState, action: Action): number => {
    switch (action.type) {
        default:
            return state
    }
}

export { scaleReducer }