import { parsePresentationFromJson } from "./parse"
import { PresentationType } from "../types"

function loadPresentation(file: File | undefined): Promise<PresentationType | null> {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const json = e.target?.result as string
                    const presentation = parsePresentationFromJson(json)
                    resolve(presentation == null ? null : presentation)
                } catch (error) {
                    reject(error)
                }
            }
            reader.onerror = (error) => reject(error)
            reader.readAsText(file)
        } else {
            resolve(null)
        }
    })
}

export { loadPresentation }