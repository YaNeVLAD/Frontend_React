import { SlideType } from "../storage/types"
import { useAppSelector } from "./useRedux"

const useSelectedSlide = (): SlideType | undefined => {
    const selectedSlideId = useAppSelector(state => state.editor.selection.selectedSlideId)
    return useAppSelector(state => state.editor.presentation.slides).find(slide => slide.id == selectedSlideId)
}

export { useSelectedSlide }