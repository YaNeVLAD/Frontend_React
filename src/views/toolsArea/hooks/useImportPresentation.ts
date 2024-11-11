import { savePresentation } from "../../../storage/actions/presentation/save"
import { restoreEditor } from "../../../storage/file/read"
import { dispatch } from "../../../storage/editor"
import { useCallback, useEffect } from "react"

const useImportPresentation = (inputRef: React.RefObject<HTMLInputElement>) => {
    const onImport = useCallback(() => {
        const file = inputRef.current?.files?.[0]
        if (!file) return

        restoreEditor(file)
            .then((presentation) => {
                if (presentation) {
                    dispatch(savePresentation, presentation)
                }
            })
            .catch(() => alert("При загрузке файла произошла ошибка."))
            .finally(() => {
                if (inputRef.current) inputRef.current.value = ""
            })
    }, [inputRef])

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