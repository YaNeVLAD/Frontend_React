import { dispatch } from "../editor"
import { saveEditor } from "../actions/editor/save"
import { parsePresentationFromJson } from "./parse"
import { validatePresentation } from "./validate"

function restoreEditor(file: File | undefined) {
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const json = e.target?.result as string
            const presentation = parsePresentationFromJson(json)
            if (presentation == null || !validatePresentation(presentation)) {
                alert("Неправильный формат файла")
                return
            }
            dispatch(saveEditor, presentation)
        }
        reader.readAsText(file)
    }
}

export { restoreEditor }