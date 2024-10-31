import { getEditor } from "../editor"

function exportDocument() {
    const presentation = getEditor().presentation
    const presentationJson = JSON.stringify(presentation)
    const blob = new Blob([presentationJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = presentation.title
    a.click()
    URL.revokeObjectURL(url)
}

export { exportDocument }