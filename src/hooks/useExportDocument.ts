import { useEffect } from "react"
import { useAppSelector } from "./useRedux"

const useExportPresentation = (
    presentationExportRef: React.RefObject<HTMLButtonElement>
) => {
    const presentation = useAppSelector(state => state.editor.presentation)

    useEffect(() => {
        const ref = presentationExportRef.current
        if (!ref) return

        const onClick = () => {
            const presentationJson = JSON.stringify(presentation)
            const blob = new Blob([presentationJson], { type: 'application/json' })
            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = presentation.title
            a.click()
            URL.revokeObjectURL(url)
            a.remove()
        }

        ref.addEventListener('click', onClick)

        return () => {
            ref.removeEventListener('click', onClick)
        }
    }, [presentation, presentationExportRef])


}

export { useExportPresentation }