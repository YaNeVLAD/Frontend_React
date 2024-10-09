import { EditorType } from "../../types"

function changePresentationTitle(
    editor: EditorType,
    { title }: { title: string }
): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: title
        }
    }
}

export { changePresentationTitle }