import { validateDocument } from "./validate"
import { getEditor, setEditor } from "../editor"
import { PresentationType } from "../types"

function importDocument(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            const json = e.target?.result as string
            const parsedData: PresentationType = JSON.parse(json)
            console.log(parsedData)
            if (validateDocument(parsedData)) {
                const editor = getEditor()
                editor.presentation = {...parsedData}
                setEditor(editor)
            } else {
                alert('Invalid document structure')
            }
        }
        reader.readAsText(file)
    }
}

export { importDocument }