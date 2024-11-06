import { EditorType, PresentationType } from "../../types"

function saveEditor(editor: EditorType, presentation: PresentationType): EditorType {
    return {
        ...editor,
        presentation: presentation,
        selection: {
            selectedSlide: presentation.slides[0],
            selectedObject: undefined
        }
    }
}

export { saveEditor }