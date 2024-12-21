import useFakePresentationFetch from "../useFakePresentationFetch"
import PDFViewer from "../../views/Viewers/PDFViewer/PDFViewer"
import { PresentationType } from "../../storage/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import style from "./PDFViewerPage.module.css"
import { PROJECT_NAME } from "../../storage/constants"

type PDFViewerPageParams = {
    id: string | undefined,
}

const PDFViewerPage = () => {
    const { id } = useParams<PDFViewerPageParams>()
    const [presentation, setPresentation] = useState<PresentationType | null>(null)

    useFakePresentationFetch(id, setPresentation)

    useEffect(() => {
        document.title = presentation ? `${presentation.title} - ${PROJECT_NAME}` : PROJECT_NAME
    })

    return (id != undefined)
        ? presentation
            ? <div className={style.viewer}><PDFViewer presentation={presentation} /></div>
            : <p>Загрузка...</p>
        : <>err</>
}

export default PDFViewerPage