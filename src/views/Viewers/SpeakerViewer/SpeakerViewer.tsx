import { createPath, EditorRoute, SpeakerNotesRoute } from "../../../storage/utils/createPath"
import PresentationViewer from "../PresentationViewer/PresentationViewer"
import useNavigateWithParams from "../../../hooks/useNavigateToRoute"
import { useState, useCallback, useEffect, useRef } from "react"
import { useAppSelector } from "../../../hooks/useRedux"

const SpeakerViewer = () => {
    const navigateWithParams = useNavigateWithParams()
    const presentation = useAppSelector(state => state.editor.presentation)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [newWindow, setNewWindow] = useState<Window | null>(null)
    const windowOpened = useRef(false)

    useEffect(() => {
        const handleRouteChange = () => {
            if (newWindow) {
                newWindow.close()
            }
        }
        window.addEventListener('popstate', handleRouteChange)

        return () => {
            window.removeEventListener('popstate', handleRouteChange)
        }
    }, [newWindow])

    const openSpeakerWindow = useCallback(() => {
        if (!windowOpened.current) {
            const newWin = window.open(createPath(SpeakerNotesRoute, { id: presentation.id }), '_blank', 'width=700,height=500')
            if (newWin) {
                setNewWindow(newWin)
                windowOpened.current = true
            }
        }
    }, [presentation.id])

    const saveSlideData = useCallback((offset: number = 0) => {
        const newIndex = currentSlideIndex + offset
        if (newIndex >= 0 && newIndex < presentation.slides.length) {
            setCurrentSlideIndex(newIndex)

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
            console.log(e.code)

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
                    document.exitFullscreen()
                    navigateWithParams(EditorRoute, {})
                    break
                case 'F11':
                    e.preventDefault()
                    document.documentElement.requestFullscreen()
                    break
                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentSlideIndex, navigateWithParams, newWindow, saveSlideData])

    useEffect(() => {
        const updateScale = () => {
        }
        updateScale()
        window.addEventListener('resize', updateScale)
        return () => {
            window.removeEventListener('resize', updateScale)
        }
    }, [])

    return (
        newWindow && <PresentationViewer index={currentSlideIndex} />
    )
}

export default SpeakerViewer