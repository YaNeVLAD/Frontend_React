import { SlidePreview } from "../../../components/SlidePreview/SlidePreview"
import SpeakerNotesWindow from "./SpeakerNotesWindow/SpeakerNotesWindow"
import { useAppSelector } from "../../../hooks/useRedux"
import { useState, useCallback, useEffect, useRef } from "react"
import ReactDOM from "react-dom/client"

const SpeakerViewer = () => {
    const presentation = useAppSelector(state => state.editor.presentation)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slide, setSlide] = useState(presentation.slides[0])
    const [newWindow, setNewWindow] = useState<Window | null>(null)
    const windowOpened = useRef(false)  // Отслеживаем, открыто ли окно

    const openSpeakerWindow = useCallback(() => {
        if (windowOpened.current) return

        const newWindow = window.open('/viewer/speaker/notes', '_blank', 'width=700,height=500')
        if (!newWindow) return
        setNewWindow(newWindow)
        windowOpened.current = true

        newWindow.onload = () => {
            const container = newWindow.document.createElement('div')
            newWindow.document.body.appendChild(container)

            ReactDOM.createRoot(container).render(
                <SpeakerNotesWindow />
            )
            newWindow.postMessage({
                type: 'SYNC_SLIDE_P',
                slideIndex: currentSlideIndex,
                maxSlides: presentation.slides.length,
                notes: presentation.slides.map(s => s.id)
            }, window.location.origin)
        }
    }, [presentation, currentSlideIndex])

    const saveSlideData = useCallback((offset: number = 0) => {
        const newIndex = currentSlideIndex + offset
        if (newIndex >= 0 && newIndex < presentation.slides.length) {
            setCurrentSlideIndex(newIndex)
            setSlide(presentation.slides[newIndex])

            if (newWindow) {
                newWindow.postMessage({
                    type: 'SYNC_SLIDE_P',
                    slideIndex: newIndex,
                    maxSlides: presentation.slides.length,
                    notes: presentation.slides.map(s => s.id)
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