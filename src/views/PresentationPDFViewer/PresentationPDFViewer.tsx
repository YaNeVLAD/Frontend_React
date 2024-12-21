import { convertPresentationToPdf } from "../../storage/file/convert"
import { PresentationType } from "../../storage/types"
import { useEffect, useState } from "react"

type PresentationViewerProps = {
    presentation: PresentationType
}

const PresentationPDFViewer = ({ presentation }: PresentationViewerProps) => {
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
            width={window.outerWidth}
            height={window.innerHeight}
            title={presentation.title}
            allowFullScreen={true}
            style={{ border: 'none', position: 'absolute', zIndex: 10 }}
        />
    )
}

export default PresentationPDFViewer