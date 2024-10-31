import { BASE_PRESENTATION } from "./basePresentation"
import { EditorType } from "../storage/types"

const BASE_EDITOR: EditorType = {
    presentation: BASE_PRESENTATION,
    selection: {
        selectedSlide: BASE_PRESENTATION.slides[0],
        selectedObject: undefined
    }
}

export { BASE_EDITOR }