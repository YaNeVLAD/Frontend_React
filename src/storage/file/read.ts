import { parsePresentationFromJson } from "./parse"
import { PresentationType } from "../types"
import { validatePresentation } from "./validation/ajv"

function restoreEditor(file: File | undefined): Promise<PresentationType | null> {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                try {
                    const json = e.target?.result as string
                    const presentation = parsePresentationFromJson(json)
                    if (presentation == null || !validatePresentation(presentation)) {
                        alert("Неправильный формат файла")
                        resolve(null)
                    } else {
                        resolve(presentation)
                    }
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

export { restoreEditor }