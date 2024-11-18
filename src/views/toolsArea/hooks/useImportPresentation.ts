import { useAppActions } from "../../../hooks/useRedux"
import { restoreEditor } from "../../../storage/file/read"
import { useCallback, useEffect } from "react"

const useImportPresentation = (inputRef: React.RefObject<HTMLInputElement>) => {
    const { updatePresentation } = useAppActions()

    const onImport = useCallback(() => {
        const file = inputRef.current?.files?.[0]
        if (!file) return

        restoreEditor(file)
            .then((presentation) => {
                if (presentation) {
                    updatePresentation(presentation)
                }
            })
            .catch(() => alert("При загрузке файла произошла ошибка."))
            .finally(() => {
                if (inputRef.current) inputRef.current.value = ""
            })
    }, [inputRef, updatePresentation])

    useEffect(() => {
        const inputElement = inputRef.current
        if (!inputElement) return

        inputElement.addEventListener('change', onImport)

        return () => {
            inputElement.removeEventListener('change', onImport)
        }
    }, [inputRef, onImport])
}

export { useImportPresentation }