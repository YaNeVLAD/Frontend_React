import { EditorType, PresentationType } from "../../types"

function savePresentation(editor: EditorType, presentation: PresentationType): EditorType {
    return {
        ...editor,
        presentation: presentation,
        selection: {
            selectedSlideId: presentation.slides[0].id,
            selectedObjectId: undefined
        }
    }
}

export { savePresentation }