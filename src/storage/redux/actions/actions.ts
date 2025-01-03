import { SizeType, BackgroundType, PositionType, SlidePreset, SlideType, PresentationType, SlideTheme } from "../../types"
import { RootState } from "../reducers/rootReducer"

type AddSlideAction = {
    type: 'ADD_SLIDE',
    payload: {
        type: SlidePreset,
        prev: boolean,
        theme: SlideTheme
    }
}

type ChangeSlideBackgroundAction = {
    type: 'CHANGE_SLIDE_BACKGROUND',
    payload: {
        selectedSlideId: string,
        background: BackgroundType
    }
}

type DeleteSlideAction = {
    type: 'DELETE_SLIDE'
}

type AddObjectAction = {
    type: 'ADD_OBJECT',
    payload: {
        selectedSlideId: string,
        type: 'imageObj' | 'textObj',
        value: string
    }
}

type UpdatePresentationAction = {
    type: 'UPDATE_PRESENTATION',
    payload: PresentationType
}

type ChangeObjectSizeAction = {
    type: 'CHANGE_OBJECT_SIZE',
    payload: {
        selectedObjectId: string,
        width: number,
        height: number
    }
}

type DeleteObjectAction = {
    type: 'DELETE_OBJECT',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string
    }
}

type DeselectAllObjectsAction = {
    type: 'DESELECT_ALL_OBJECTS',
    payload: undefined
}

type ChangeObjectBoundsAction = {
    type: 'CHANGE_OBJECT_BOUNDS',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        position: PositionType
        size?: SizeType
    }
}

type SelectObjectAction = {
    type: 'SELECT_OBJECT',
    payload: string
}

type ChangeSrcValueAction = {
    type: 'CHANGE_SRC_VALUE',
    payload: {
        selectedObjectId: string,
        selectedSlideId: string,
        value: string
    }
}

type ChangeTextValueAction = {
    type: 'CHANGE_TEXT_VALUE',
    payload: {
        selectedObjectId: string,
        selectedSlideId: string,
        value: string
    }
}

type ChangePresentationTitleAction = {
    type: 'CHANGE_PRESENTATION_TITLE',
    payload: {
        title: string
    }
}

type SelectSlideAction = {
    type: 'SELECT_SLIDE',
    payload: string
}

type DeselectSlideAction = {
    type: 'DESELECT_OBJECT'
}

type MoveSlideAction = {
    type: 'MOVE_SLIDE',
    payload: Array<SlideType>
}

type ChangeAllSlidesBackgroundAction = {
    type: 'CHANGE_ALL_SLIDES_BACKGROUND',
    payload: BackgroundType
}

type ChangeSlideThemeBackgroundAction = {
    type: 'CHANGE_THEME_BACKGROUND',
    payload: BackgroundType
}

type SetStateAction = {
    type: 'SET_STATE',
    payload: RootState
}

type ChangePresentationId = {
    type: 'CHANGE_PRESENTATION_ID',
    payload: string
}

type ChangePresentationAuthor = {
    type: 'CHANGE_PRESENTATION_AUTHOR',
    payload: string
}

type ChangeSlideNote = {
    type: 'CHANGE_SLIDE_NOTE',
    payload: {
        selectedSlideId?: string,
        note: string
    }
}

type Action =
    | SetStateAction
    | AddSlideAction
    | AddObjectAction
    | ChangeSlideNote
    | MoveSlideAction
    | SelectSlideAction
    | DeleteSlideAction
    | DeleteObjectAction
    | SelectObjectAction
    | DeselectSlideAction
    | ChangeSrcValueAction
    | ChangePresentationId
    | ChangeTextValueAction
    | ChangeObjectSizeAction
    | ChangePresentationAuthor
    | ChangeObjectBoundsAction
    | UpdatePresentationAction
    | DeselectAllObjectsAction
    | ChangeSlideBackgroundAction
    | ChangePresentationTitleAction
    | ChangeAllSlidesBackgroundAction
    | ChangeSlideThemeBackgroundAction

export type { Action }