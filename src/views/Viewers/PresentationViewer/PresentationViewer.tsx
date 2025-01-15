import { SlidePreview } from "../../../components/SlidePreview/SlidePreview"
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "../../../storage/constants"
import useNavigateWithParams from "../../../hooks/useNavigateToRoute"
import { EditorRoute } from "../../../storage/utils/createPath"
import { useAppSelector } from "../../../hooks/useRedux"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const PresentationViewer = ({ index }: { index?: number }) => {
    const presentation = useAppSelector(s => s.editor.presentation)
    const { from } = useParams<{ from: string }>()
    const navigateWithParams = useNavigateWithParams()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(Number(from || 0))

    useEffect(() => {
        const enableFullscreen = async () => {
            const elem = document.documentElement
            try {
                if (elem.requestFullscreen) await elem.requestFullscreen()
            } catch (error) {
                console.error("Failed to enable fullscreen:", error)
            }
        }
        enableFullscreen()

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                navigateWithParams(EditorRoute, {}, { replace: true })
            }
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [navigateWithParams])

    useEffect(() => {
        const changeSlide = (newIndex: number) => {
            if (newIndex >= 0 && newIndex < presentation.slides.length) {
                setCurrentSlideIndex(newIndex)
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowDown':
                case 'ArrowRight':
                    changeSlide(currentSlideIndex + 1)
                    break

                case 'ArrowUp':
                case 'ArrowLeft':
                    changeSlide(currentSlideIndex - 1)
                    break

                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [currentSlideIndex, presentation.slides.length])

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    const scaleX = screenWidth / SLIDE_WIDTH
    const scaleY = screenHeight / SLIDE_HEIGHT
    const finalScale = Math.max(scaleX, scaleY)

    return (
        <SlidePreview
            id={presentation.slides[index || currentSlideIndex].id}
            scale={finalScale}
            objectScale={finalScale}
        />
    )
}

export default PresentationViewer