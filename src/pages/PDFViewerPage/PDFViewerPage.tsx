import PresentationPDFViewer from "../../views/PresentationPDFViewer/PresentationPDFViewer"
import { PresentationType } from "../../storage/types"
import { useAppSelector } from "../../hooks/useRedux"
import { useParams } from "react-router"
import { useEffect, useState } from "react"

type ViewerPageParams = {
    id: string | undefined,
}

const PDFViewerPage = () => {
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
            ? <PresentationPDFViewer presentation={presentation} />
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

export default PDFViewerPage