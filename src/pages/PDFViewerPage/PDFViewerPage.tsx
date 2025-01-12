import PDFViewer from "../../views/Viewers/PDFViewer/PDFViewer"
import { PROJECT_NAME } from "../../storage/constants"
import { useAppSelector } from "../../hooks/useRedux"
import { useParams } from "react-router"
import { useEffect } from "react"
import style from "./PDFViewerPage.module.css"

type PDFViewerPageParams = {
    id: string | undefined,
}

const PDFViewerPage = () => {
    const { id } = useParams<PDFViewerPageParams>()
    const presentation = useAppSelector(s => s.editor.presentation)

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