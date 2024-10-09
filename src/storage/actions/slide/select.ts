import { EditorType } from "../../types"

function selectSlide(editor: EditorType, { id }: { id: string }): EditorType {
    const slide = editor.presentation.slides.find(slide => slide.id == id)
    if (slide == undefined) return editor

    return {
        ...editor,
        selection: {
            selectedSlide: slide,
            selectedObject: undefined
        }
    }
}

export { selectSlide }