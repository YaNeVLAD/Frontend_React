import { SlidePreset, PositionType, SizeType, BackgroundType, SlideType, PresentationType, SlideTheme } from "../../types"
import { RootState } from "../reducers/rootReducer"
import { Action } from "./actions"

const addSlide = (type: SlidePreset, prev: boolean = false, theme: SlideTheme): Action => ({
    type: 'ADD_SLIDE',
    payload: { type, prev, theme }
})

const changeSlideBackground = (selectedSlideId: string, background: BackgroundType): Action => ({
    type: 'CHANGE_SLIDE_BACKGROUND',
    payload: { selectedSlideId, background }
})

const deleteSlide = (): Action => ({
    type: 'DELETE_SLIDE'
})

const addObject = (selectedSlideId: string, type: 'imageObj' | 'textObj', value: string): Action => ({
    type: 'ADD_OBJECT',
    payload: { selectedSlideId, type, value }
})

const deleteObject = (selectedSlideId: string, selectedObjectId: string): Action => ({
    type: 'DELETE_OBJECT',
    payload: { selectedSlideId, selectedObjectId }
})

const changeObjectBounds = (
    selectedSlideId: string,
    selectedObjectId: string,
    position: PositionType,
    size: SizeType | undefined): Action => ({
        type: 'CHANGE_OBJECT_BOUNDS',
        payload: { selectedSlideId, selectedObjectId, position, size }
    })

const selectObject = (selectedObjectId: string): Action => ({
    type: 'SELECT_OBJECT',
    payload: selectedObjectId
})

const changeSrcValue = (selectedObjectId: string, selectedSlideId: string, value: string): Action => ({
    type: 'CHANGE_SRC_VALUE',
    payload: { selectedObjectId, selectedSlideId, value }
})

const changeTextValue = (selectedObjectId: string, selectedSlideId: string, value: string): Action => ({
    type: 'CHANGE_TEXT_VALUE',
    payload: { selectedObjectId, selectedSlideId, value }
})

const changePresentationTitle = (title: string): Action => ({
    type: 'CHANGE_PRESENTATION_TITLE',
    payload: { title }
})

const selectSlide = (id: string): Action => ({
    type: 'SELECT_SLIDE',
    payload: id
})

const deselectObjects = (): Action => ({
    type: 'DESELECT_OBJECT',
})

const moveSlide = (slides: Array<SlideType>): Action => ({
    type: 'MOVE_SLIDE',
    payload: slides
})

const importPresentation = (presentation: PresentationType): Action => ({
    type: 'UPDATE_PRESENTATION',
    payload: presentation
})

const changeSlideThemeBackground = (background: BackgroundType): Action => ({
    type: 'CHANGE_THEME_BACKGROUND',
    payload: background
})

const changeAllSlidesBackground = (background: BackgroundType): Action => ({
    type: 'CHANGE_ALL_SLIDES_BACKGROUND',
    payload: background
})

const setState = (state: RootState): Action => ({
    type: 'SET_STATE',
    payload: state
})

const changePresentationId = (id: string): Action => ({
    type: 'CHANGE_PRESENTATION_ID',
    payload: id
})

const changePresentationAuthor = (author: string): Action => ({
    type: 'CHANGE_PRESENTATION_AUTHOR',
    payload: author
})

const changeSlideNote = (note: string, slideId?: string): Action => ({
    type: 'CHANGE_SLIDE_NOTE',
    payload: {
        note: note,
        selectedSlideId: slideId
    }
})

export {
    setState,
    addSlide,
    moveSlide,
    addObject,
    selectSlide,
    deleteSlide,
    deleteObject,
    selectObject,
    changeSrcValue,
    changeSlideNote,
    changeTextValue,
    deselectObjects,
    changeObjectBounds,
    importPresentation,
    changePresentationId,
    changeSlideBackground,
    changePresentationTitle,
    changePresentationAuthor,
    changeAllSlidesBackground,
    changeSlideThemeBackground,
}