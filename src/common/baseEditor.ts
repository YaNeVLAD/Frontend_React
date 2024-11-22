import { BASE_PRESENTATION } from "./BasePresentation"
import { EditorType } from "../storage/types"

const presentation = BASE_PRESENTATION()

function BASE_EDITOR(): EditorType {
    return {
        presentation: presentation,
        selection: {
            selectedSlideId: presentation.slides[0].id,
            selectedObjectId: undefined
        }
    }
}

export { BASE_EDITOR }