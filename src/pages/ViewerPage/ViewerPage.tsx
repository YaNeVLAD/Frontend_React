import { useParams } from "react-router"
import PresentationViewer from "../../views/PresentationViewer/PresentationViewer"
import { useEffect, useState } from "react"
import { PresentationType } from "../../storage/types"
import { useAppSelector } from "../../hooks/useRedux"

type ViewerPageParams = {
    id: string | undefined,
}

const ViewerPage = () => {
    const { id } = useParams<ViewerPageParams>()
    const [presentation, setPresentation] = useState<PresentationType | null>(null)

    const onPresentationLoad = (presentation: PresentationType) => {
        setPresentation(presentation)
    }

    useFakePresentationFetch(id, onPresentationLoad)

    useEffect(() => {
        document.title = presentation ? `${presentation.title} - ${document.title}` : document.title
    })

    return (
        presentation
            ? <PresentationViewer presentation={presentation} />
            : <p>Загрузка...</p>
    )
}

const useFakePresentationFetch = (id: string | undefined, onLoad: (presentation: PresentationType) => void) => {
    const presentation = useAppSelector(state => state.editor.presentation)

    useEffect(() => {
        async function loadPresentation(id: string | undefined) {
            return new Promise<PresentationType>((resolve, reject) => {
                if (!id) reject("Invalid Id")

                setTimeout(() => {
                    resolve(presentation)
                    onLoad(presentation)
                }, 3000)
            })
        }

        try {
            loadPresentation(id)
        } catch (err) {
            console.error(err)
        }
    })
}

export default ViewerPage