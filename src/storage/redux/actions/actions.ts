import { SizeType, BackgroundType, PositionType, SlidePreset, SlideType, PresentationType, SlideTheme, ImageType, FontFamily, Alignment, FontWeight, FontStyle, TextDecoration } from "../../types"
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

type ChangePresentationIdAction = {
    type: 'CHANGE_PRESENTATION_ID',
    payload: string
}

type ChangePresentationAuthorAction = {
    type: 'CHANGE_PRESENTATION_AUTHOR',
    payload: string
}

type ChangeSlideNoteAction = {
    type: 'CHANGE_SLIDE_NOTE',
    payload: {
        selectedSlideId?: string,
        note: string
    }
}

type AddImageAction = {
    type: 'ADD_IMAGE',
    payload: {
        selectedSlideId?: string,
        object: ImageType
    }
}

type ChangeFontSizeAction = {
    type: 'CHANGE_FONT_SIZE',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newSize: number
    }
}

type ChangeFontFamilyAction = {
    type: 'CHANGE_FONT_FAMILY',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newFamily: FontFamily
    }
}

type ChangeTextAlignmentAction = {
    type: 'CHANGE_TEXT_ALIGNMENT',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        vertical?: Alignment,
        horizontal?: Alignment,
    }
}

type ChangeTextColorAction = {
    type: 'CHANGE_TEXT_COLOR',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        newColor: string
    }
}

type ChangeTextStyleAction = {
    type: 'CHANGE_TEXT_STYLE',
    payload: {
        selectedSlideId: string,
        selectedObjectId: string,
        weight?: FontWeight,
        style?: FontStyle,
        decoration?: TextDecoration,
    }
}

type Action =
    | AddImageAction
    | SetStateAction
    | AddSlideAction
    | AddObjectAction
    | MoveSlideAction
    | SelectSlideAction
    | DeleteSlideAction
    | DeleteObjectAction
    | SelectObjectAction
    | DeselectSlideAction
    | ChangeFontSizeAction
    | ChangeSrcValueAction
    | ChangeSlideNoteAction
    | ChangeTextColorAction
    | ChangeTextValueAction
    | ChangeTextStyleAction
    | ChangeFontFamilyAction
    | ChangeObjectSizeAction
    | ChangeObjectBoundsAction
    | UpdatePresentationAction
    | DeselectAllObjectsAction
    | ChangeTextAlignmentAction
    | ChangePresentationIdAction
    | ChangeSlideBackgroundAction
    | ChangePresentationTitleAction
    | ChangePresentationAuthorAction
    | ChangeAllSlidesBackgroundAction
    | ChangeSlideThemeBackgroundAction

export type { Action }