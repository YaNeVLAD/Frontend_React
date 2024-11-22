import { loadPresentation } from "../storage/file/read"
import { useCallback, useEffect, useRef } from "react"
import { useAppActions } from "./useRedux"

const useImportPresentation = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const { importPresentation } = useAppActions()

    const onImport = useCallback(() => {
        const file = inputRef.current?.files?.[0]
        if (!file) return

        loadPresentation(file)
            .then((presentation) => {
                if (presentation) {
                    importPresentation(presentation)
                }
            })
            .catch(() => alert("При загрузке файла произошла ошибка."))
            .finally(() => {
                if (inputRef.current) inputRef.current.value = ""
            })
    }, [inputRef, importPresentation])

    useEffect(() => {
        const inputElement = inputRef.current
        if (!inputElement) return

        inputElement.addEventListener('change', onImport)

        return () => {
            inputElement.removeEventListener('change', onImport)
        }
    }, [inputRef, onImport])

    return { inputRef }
}

export { useImportPresentation }