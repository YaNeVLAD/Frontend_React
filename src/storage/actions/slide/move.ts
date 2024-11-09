import { EditorType, SlideType } from "../../types"

function moveSlide(editor: EditorType, { slides }: { slides: Array<SlideType> }): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: slides
        }
    }
}

export { moveSlide }
