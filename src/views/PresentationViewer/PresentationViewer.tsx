import { convertPresentationToPdf } from "../../storage/file/convert"
import { Button } from "../../components/Button/Button"
import { useAppSelector } from "../../hooks/useRedux"
import { useEffect, useState } from "react"

const PresentationViewer = () => {
    const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)
    const presentation = useAppSelector(state => state.editor.presentation)

    useEffect(() => {
        const loadPdf = async () => {
            const pdfBytes = await convertPresentationToPdf(presentation)
            const pdfDataUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))

            setPdfUrl(pdfDataUrl)
        }

        loadPdf()
    }, [presentation])

    return (
        <>
            <Button
                type="text"
                displayType="image-input"
                onClick={() => setIsOpen(!isOpen)}>
                {'Слайд-шоу'}
            </Button>
            {isOpen && (
                <iframe
                    src={pdfUrl}
                    width={window.outerWidth}
                    height={window.innerHeight}
                    title={presentation.title}
                    allowFullScreen={true}
                    style={{ border: 'none', position: 'absolute', zIndex: 10 }}
                />
            )}
        </>
    )
}

export default PresentationViewer