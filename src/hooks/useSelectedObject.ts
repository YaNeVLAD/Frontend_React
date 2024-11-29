import { SlideObjectType } from "../storage/types"
import { useSelectedSlide } from "./useSelectedSlide"
import { useAppSelector } from "./useRedux"

const useSelectedObject = (): SlideObjectType | undefined => {
    const selectedSlide = useSelectedSlide()
    const selectedObjectId = useAppSelector(state => state.editor.selection.selectedObjectId)
    if (selectedSlide == undefined) return undefined
    return selectedSlide.objects.find(obj => obj.id == selectedObjectId)
}

export { useSelectedObject }