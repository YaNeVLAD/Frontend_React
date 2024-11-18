import { Action } from "../actions/actions"

const initialState: string = ''

const titleReducer = (state = initialState, action: Action): string => {
    switch (action.type) {
        case 'CHANGE_PRESENTATION_TITLE':
            return action.payload.title
        default:
            return state
    }
}

export { titleReducer }