import { useAppSelector } from "./useRedux"

const useExportPresentation = () => {
    const presentation = useAppSelector((state) => state.editor.presentation)

    const exportPresentation = () => {
        try {
            const presentationJson = JSON.stringify(presentation)
            const blob = new Blob([presentationJson], { type: "application/json" })
            const url = URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = presentation.title || "presentation.json"
            a.click()
            URL.revokeObjectURL(url)
            a.remove()
        } catch (error) {
            console.error("Ошибка при экспорте презентации:", error)
        }
    }

    return { exportPresentation }
}

export { useExportPresentation }