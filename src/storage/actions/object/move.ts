import { deepCopy } from "../../deepCopy"
import { EditorType } from "../../types"

function moveObject(editor: EditorType, { x, y }: { x: number, y: number }): EditorType {
    const editorCopy = deepCopy(editor)
    const object = editorCopy.selection.selectedObject
    if (object == undefined) return editor

    object.pos = { x, y }

    return {
        ...editorCopy
    }
}

export { moveObject }