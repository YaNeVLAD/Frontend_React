import { EditorType } from "../../types"

function deselectAllObjects(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedObject: undefined
        }
    }
}

export { deselectAllObjects }