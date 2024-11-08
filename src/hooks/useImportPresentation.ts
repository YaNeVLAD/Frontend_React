import { useCallback } from "react"
import { dispatch } from "../storage/editor"
import { savePresentation } from "../storage/actions/presentation/save"
import { restoreEditor } from "../storage/file/read"

const useImportPresentation = (inputRef: React.RefObject<HTMLInputElement>) => {
    return useCallback(() => {
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
}

export { useImportPresentation }