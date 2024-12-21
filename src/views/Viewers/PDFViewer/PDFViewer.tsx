import { convertPresentationToPdf } from "../../../storage/file/convert"
import { PresentationType } from "../../../storage/types"
import { useEffect, useState } from "react"

type PresentationViewerProps = {
    presentation: PresentationType
}

const PDFViewer = ({ presentation }: PresentationViewerProps) => {
    const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined)

    useEffect(() => {
        const loadPdf = async () => {
            const pdfBytes = await convertPresentationToPdf(presentation)
            const pdfDataUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))

            setPdfUrl(pdfDataUrl)
        }

        loadPdf()
    }, [presentation])

    return (
        <iframe
            src={pdfUrl}
            title={presentation.title}
            allowFullScreen={true}
            style={{ border: 'none', width: `100%`, height: `100%` }}
        />
    )
}

export default PDFViewer