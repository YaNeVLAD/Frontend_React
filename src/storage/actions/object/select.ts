import { EditorType } from "../../types"

function selectObject(editor: EditorType, { id }: { id: string }): EditorType {
    const object = editor.selection.selectedSlide.objects.find(object => object.id == id)
    if (object == undefined) return editor

    return {
        ...editor,
        selection: {
            selectedSlide: editor.selection.selectedSlide,
            selectedObject: object
        }
    }
}

export { selectObject }