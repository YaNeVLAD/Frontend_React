import { SlidePreview } from "../../../components/SlidePreview/SlidePreview"
import useNavigateWithParams from "../../../hooks/useNavigateToRoute"
import { EditorRoute } from "../../../storage/utils/createPath"
import { useAppSelector } from "../../../hooks/useRedux"
import { useEffect, useState } from "react"
import styles from "./PresentationViewer.module.css"
import { useParams } from "react-router"

const PresentationViewer = () => {
    const presentation = useAppSelector(s => s.editor.presentation)
    const { from } = useParams<{ from: string }>()
    const navigateWithParams = useNavigateWithParams()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(Number(from))

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

    const scaleX = screenWidth / 913
    const scaleY = screenHeight / 513
    const finalScale = Math.max(scaleX, scaleY)

    return (
        <div className={styles.layout}>
            <SlidePreview
                id={presentation.slides[currentSlideIndex].id}
                scale={finalScale}
                objectScale={1}
            />
        </div>
    )
}

export default PresentationViewer