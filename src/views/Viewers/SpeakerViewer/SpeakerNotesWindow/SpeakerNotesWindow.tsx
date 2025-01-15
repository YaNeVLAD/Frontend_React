import { useAppSelector } from "../../../../hooks/useRedux"
import { useState, useEffect, useCallback, useMemo } from "react"
import style from "./SpeakerNotesWindow.module.css"
import { SlidePreview } from "../../../../components/SlidePreview/SlidePreview"

const SpeakerNotesWindow = () => {
    const slides = useAppSelector(s => s.editor.presentation.slides)
    const notes = slides.map(s => s.note)
    const maxSlides = slides.length
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === window.location.origin) {
                if (event.data.type === 'SYNC_SLIDE_P') {
                    const { slideIndex } = event.data
                    setIndex(slideIndex)
                }
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    const onNextSlide = useCallback(() => {
        if (index < maxSlides - 1) {
            setIndex(index + 1)
            if (!window.opener) return
            window.opener.postMessage({
                type: 'SYNC_SLIDE_C',
                slideIndex: index + 1,
            }, window.location.origin)
        }
    }, [index, maxSlides])

    const onPrevSlide = useCallback(() => {
        if (index > 0) {
            setIndex(index - 1)
            if (!window.opener) return
            window.opener.postMessage({
                type: 'SYNC_SLIDE_C',
                slideIndex: index - 1,
            }, window.location.origin)
        }
    }, [index])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'ArrowDown':
                case 'ArrowRight':
                    onNextSlide()
                    break

                case 'ArrowUp':
                case 'ArrowLeft':
                    onPrevSlide()
                    break

                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onNextSlide, onPrevSlide])

    const slideRatio = useMemo(() => 150 / 913, [])

    return (
        <div className={style.speakerWindow}>
            <h1>Заметки докладчика</h1>
            <div className={style.controls}>
                <div onClick={onPrevSlide}>
                    {index - 1 >= 0 &&
                        <SlidePreview
                            id={slides[index - 1].id}
                            scale={slideRatio}
                            objectScale={slideRatio}
                            className={style.slide}
                        />}
                </div>
                <div onClick={onNextSlide}>
                    {index + 1 < slides.length &&
                        <SlidePreview
                            id={slides[index + 1].id}
                            scale={slideRatio}
                            objectScale={slideRatio}
                            className={style.slide}
                        />
                    }
                </div>
            </div>
            <div className={style.notes}>
                <p>{notes[index]}</p>
            </div>
        </div>
    )
}

export default SpeakerNotesWindow