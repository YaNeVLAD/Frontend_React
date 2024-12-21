import { createPath, EditorRoute, SpeakerNotesRoute } from "../../../storage/utils/createPath"
import { SlidePreview } from "../../../components/SlidePreview/SlidePreview"
import { useState, useCallback, useEffect, useRef } from "react"
import { useAppSelector } from "../../../hooks/useRedux"
import useNavigateWithParams from "../../../hooks/useNavigateToRoute"

const SpeakerViewer = () => {
    const navigateWithParams = useNavigateWithParams()
    const presentation = useAppSelector(state => state.editor.presentation)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slide, setSlide] = useState(presentation.slides[0])
    const [newWindow, setNewWindow] = useState<Window | null>(null)
    const windowOpened = useRef(false)

    useEffect(() => {
        const handleRouteChange = () => {
            if (newWindow) {
                newWindow.close()
            }
        }
        // Слушаем события изменения URL
        window.addEventListener('popstate', handleRouteChange)

        return () => {
            window.removeEventListener('popstate', handleRouteChange)
        }
    }, [newWindow])

    const openSpeakerWindow = useCallback(() => {
        if (!windowOpened.current) {
            const newWindow = window.open(createPath(SpeakerNotesRoute, { id: presentation.id }), '_blank', 'width=700,height=500')
            if (newWindow) {
                setNewWindow(newWindow)
                windowOpened.current = true
            }
        }
    }, [presentation.id])

    const saveSlideData = useCallback((offset: number = 0) => {
        const newIndex = currentSlideIndex + offset
        if (newIndex >= 0 && newIndex < presentation.slides.length) {
            setCurrentSlideIndex(newIndex)
            setSlide(presentation.slides[newIndex])

            if (newWindow) {
                newWindow.postMessage({
                    type: 'SYNC_SLIDE_P',
                    slideIndex: newIndex,
                }, window.location.origin)
            }
        }
    }, [currentSlideIndex, newWindow, presentation])

    useEffect(() => {
        const savedIndex = localStorage.getItem('currentSlideIndex')
        if (savedIndex != null) {
            setSlide(presentation.slides[Number(savedIndex)])
            setCurrentSlideIndex(Number(savedIndex))
        }

        openSpeakerWindow()
    }, [openSpeakerWindow, presentation])

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === window.location.origin && event.data.type === 'SYNC_SLIDE_C') {
                const { slideIndex } = event.data
                if (slideIndex !== undefined) {
                    setCurrentSlideIndex(slideIndex)
                    setSlide(presentation.slides[slideIndex])
                }
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [newWindow, presentation])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowDown':
                case 'ArrowRight':
                    saveSlideData(1)
                    break

                case 'ArrowUp':
                case 'ArrowLeft':
                    saveSlideData(-1)
                    break

                case 'Escape':
                    if (newWindow)
                        newWindow.close()
                    navigateWithParams(EditorRoute, {})
                    break

                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentSlideIndex, saveSlideData])

    return (
        <>
            {slide && (
                <>
                    <SlidePreview
                        id={slide.id}
                        scale={1}
                        objectScale={1}
                    />
                    <div>
                        <button onClick={() => saveSlideData(-1)}>Предыдущий слайд</button>
                        <button onClick={() => saveSlideData(1)}>Следующий слайд</button>
                    </div>
                </>
            )}
        </>
    )
}

export default SpeakerViewer