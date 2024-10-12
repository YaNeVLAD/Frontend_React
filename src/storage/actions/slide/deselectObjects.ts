import { EditorType } from "../../types"

function deselectSlideObjects(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObject: undefined
        }
    }
}

export { deselectSlideObjects }