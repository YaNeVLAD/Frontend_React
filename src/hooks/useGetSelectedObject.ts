import { SlideObjectType } from "../storage/types"
import { useGetSelectedSlide } from "./useGetSelectedSlide"
import { useAppSelector } from "./useRedux"

const useGetSelectedObject = (): SlideObjectType | undefined => {
    const selectedSlide = useGetSelectedSlide()
    const selectedObjectId = useAppSelector(state => state.editor.selection.selectedObjectId)
    if (selectedSlide == undefined) return undefined
    return selectedSlide.objects.find(obj => obj.id == selectedObjectId)
}

export { useGetSelectedObject }