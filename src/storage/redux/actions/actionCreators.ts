import { Action } from "./actions"
import { SlidePreset, PositionType, SizeType, BackgroundType, SlideType, PresentationType } from "../../types"

const addSlide = (selectedSlideId: string | undefined, type: SlidePreset, prev: boolean = false): Action => ({
    type: 'ADD_SLIDE',
    payload: { selectedSlideId, type, prev }
})

const changeSlideBackground = (selectedSlideId: string, background: BackgroundType): Action => ({
    type: 'CHANGE_SLIDE_BACKGROUND',
    payload: { selectedSlideId, background }
})

const deleteSlide = (selectdeSlideId: string): Action => ({
    type: 'DELETE_SLIDE',
    payload: selectdeSlideId
})

const addObject = (selectedSlideId: string | undefined, type: 'imageObj' | 'textObj', value: string): Action => ({
    type: 'ADD_OBJECT',
    payload: { selectedSlideId, type, value }
})

const changeObjectSize = (selectedObjectId: string, width: number, height: number): Action => ({
    type: 'CHANGE_OBJECT_SIZE',
    payload: { selectedObjectId, width, height }
})

const deleteObject = (selectedSlideId: string, selectedObjectId: string): Action => ({
    type: 'DELETE_OBJECT',
    payload: { selectedSlideId, selectedObjectId }
})

const moveObject = (selectedSlideId: string, selectedObjectId: string, position: PositionType): Action => ({
    type: 'MOVE_OBJECT',
    payload: { selectedSlideId, selectedObjectId, position }
})

const resizeObject = (selectedObjectId: string, size: SizeType): Action => ({
    type: 'RESIZE_OBJECT',
    payload: { selectedObjectId, size }
})

const selectObject = (selectedObjectId: string): Action => ({
    type: 'SELECT_OBJECT',
    payload: selectedObjectId
})

const changeSrcValue = (selectedObjectId: string, value: string): Action => ({
    type: 'CHANGE_SRC_VALUE',
    payload: { selectedObjectId, value }
})

const changeTextValue = (selectedObjectId: string, value: string): Action => ({
    type: 'CHANGE_TEXT_VALUE',
    payload: { selectedObjectId, value }
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

const updatePresentation = (presentation: PresentationType): Action => ({
    type: 'UPDATE_PRESENTATION',
    payload: presentation
})

export {
    addSlide,
    moveSlide,
    addObject,
    moveObject,
    selectSlide,
    deleteSlide,
    deleteObject,
    resizeObject,
    selectObject,
    changeSrcValue,
    changeTextValue,
    deselectObjects,
    changeObjectSize,
    updatePresentation,
    changeSlideBackground,
    changePresentationTitle,
}