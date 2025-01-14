import { SlideType } from "../storage/types"
import { useAppSelector } from "./useRedux"

const useSelectedSlide = (): SlideType | undefined => {
    const selectedSlideIds = useAppSelector(state => state.editor.selection.selectedSlideIds)
    const slideId = selectedSlideIds && selectedSlideIds.length != 0 ? selectedSlideIds[selectedSlideIds.length - 1] : ""
    return useAppSelector(
        state => state.editor.presentation.slides)
        .find(slide => slide.id == slideId)
}

export { useSelectedSlide }