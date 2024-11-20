import { Action } from "../actions/actions"
import { SlideTheme } from "../../types"

const initialState: SlideTheme = {
    background: { type: 'solid', value: '#ffffff' }
}

const themeReducer = (state = initialState, action: Action): SlideTheme => {
    switch (action.type) {
        case 'CHANGE_THEME_BACKGROUND':
            return {...state, background: action.payload}
    
        default:
            return state
    }
}

export { themeReducer }