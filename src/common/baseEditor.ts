import { BASE_PRESENTATION } from "./basePresentation"
import { EditorType } from "../storage/types"

const BASE_EDITOR: EditorType = {
    presentation: BASE_PRESENTATION,
    selection: {
        selectedSlideId: BASE_PRESENTATION.slides[0].id,
        selectedObjectId: undefined
    }
}

export { BASE_EDITOR }