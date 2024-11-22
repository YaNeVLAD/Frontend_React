import { SizeType, BackgroundType, PositionType, SlidePreset, SlideType, PresentationType, SlideTheme } from "../../types"

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
        selectedSlideId?: string,
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
        selectedSlideId?: string,
        selectedObjectId?: string
    }
}

type DeselectAllObjectsAction = {
    type: 'DESELECT_ALL_OBJECTS',
    payload: undefined
}

type MoveObjectAction = {
    type: 'MOVE_OBJECT',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        position: PositionType
    }
}

type ResizeObjectAction = {
    type: 'RESIZE_OBJECT',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        size: SizeType
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
        value: string
    }
}

type ChangeTextValueAction = {
    type: 'CHANGE_TEXT_VALUE',
    payload: {
        selectedObjectId: string,
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
    type: 'MOVE_SLIDE'
    payload: Array<SlideType>
}

type ChangeAllSlidesBackground = {
    type: 'CHANGE_ALL_SLIDES_BACKGROUND'
    payload: BackgroundType
}

type ChangeSlideThemeBackground = {
    type: 'CHANGE_THEME_BACKGROUND'
    payload: BackgroundType
}

type ChangeWorkspaceScale = {
    type: 'CHANGE_SCALE'
    payload: number
}

type Action =
    | AddSlideAction
    | AddObjectAction
    | MoveSlideAction
    | MoveObjectAction
    | SelectSlideAction
    | DeleteSlideAction
    | DeleteObjectAction
    | ResizeObjectAction
    | SelectObjectAction
    | DeselectSlideAction
    | ChangeWorkspaceScale
    | ChangeSrcValueAction
    | ChangeTextValueAction
    | ChangeObjectSizeAction
    | UpdatePresentationAction
    | DeselectAllObjectsAction
    | ChangeAllSlidesBackground
    | ChangeSlideThemeBackground
    | ChangeSlideBackgroundAction
    | ChangePresentationTitleAction

export type { Action }