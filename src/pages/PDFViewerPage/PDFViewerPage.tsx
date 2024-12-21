import PDFViewer from "../../views/Viewers/PDFViewer/PDFViewer"
import { PresentationType } from "../../storage/types"
import { useAppSelector } from "../../hooks/useRedux"
import { useParams } from "react-router"
import { useEffect, useState } from "react"
import style from "./PDFViewerPage.module.css"

type PDFViewerPageParams = {
    id: string | undefined,
}

const PDFViewerPage = () => {
    const { id } = useParams<PDFViewerPageParams>()
    const [presentation, setPresentation] = useState<PresentationType | null>(null)

    const onPresentationLoad = (presentation: PresentationType) => {
        setPresentation(presentation)
    }

    useFakePresentationFetch(id, onPresentationLoad)

    useEffect(() => {
        document.title = presentation ? `${presentation.title} - ${document.title}` : document.title
    })

    return (id != undefined)
        ? presentation
            ? <div className={style.viewer}><PDFViewer presentation={presentation} /></div>
            : <p>Загрузка...</p>
        : <>err</>
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