import { EditorType, PresentationType } from "../../types"
import { BASE_IMAGE } from "./../../../common/baseImage"
import { BASE_TEXT_AREA } from "../../../common/textArea/baseTextArea"
import { deepCopy } from "../../deepCopy"
import { uuid } from "../../functions"

function addObject(
    editor: EditorType,
    { type }: { type: 'imageObj' | 'textObj' }
): EditorType {
    const presentationCopy: PresentationType = deepCopy(editor.presentation)

    const selectedSlide = presentationCopy.slides.find(
        slide => slide.id == editor.selection.selectedSlide.id
    )
    if (selectedSlide == undefined) return editor

    let newObject
    if (type === 'imageObj') {
        newObject = deepCopy(BASE_IMAGE)
    } else {
        newObject = deepCopy(BASE_TEXT_AREA)
    }
    newObject.id = uuid()

    selectedSlide.objects.push(newObject)

    return {
        ...editor,
        presentation: {
            ...presentationCopy,
        },
        selection: {
            selectedSlide: selectedSlide,
            selectedObject: newObject
        },
    }
}

export { addObject }