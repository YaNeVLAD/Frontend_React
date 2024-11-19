import { BasePresentation } from "./basePresentation"
import { EditorType } from "../storage/types"
import { deepCopy } from "../storage/utils/deepCopy"

const presentation = BasePresentation()

const BASE_EDITOR: EditorType = {
    presentation: presentation,
    selection: {
        selectedSlideId: presentation.slides[0].id,
        selectedObjectId: undefined
    }
}

const BaseEditor = (): EditorType => deepCopy(BASE_EDITOR)

export { BaseEditor }