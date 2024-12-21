import { useEffect } from "react"
import { useAppSelector } from "../hooks/useRedux"
import { PresentationType } from "../storage/types"
import { deepCopy } from "../storage/utils/deepCopy"

const useFakePresentationFetch = (id: string | undefined, onLoad: (presentation: PresentationType) => void) => {
    const presentation = useAppSelector(state => state.editor.presentation)

    useEffect(() => {
        async function loadPresentation(id: string | undefined) {
            return new Promise<void>((resolve, reject) => {
                if (!id) reject("Invalid Id")

                setTimeout(() => {
                    resolve()
                    onLoad(deepCopy(presentation))
                }, 1000)
            })
        }

        try {
            loadPresentation(id)
        } catch (err) {
            console.error(err)
        }
    }, [id, onLoad, presentation])
}

export default useFakePresentationFetch