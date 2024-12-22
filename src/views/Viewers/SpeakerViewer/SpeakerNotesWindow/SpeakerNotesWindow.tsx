import { useState, useEffect, useCallback } from "react"
import style from "./SpeakerNotesWindow.module.css"
import { useAppSelector } from "../../../../hooks/useRedux"

const SpeakerNotesWindow = () => {
    const [index, setIndex] = useState<number>(0)
    const slides = useAppSelector(s => s.editor.presentation.slides)
    const notes = slides.map(s => s.note)
    const maxSlides = slides.length

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

    return (
        <div className={style.speakerWindow}>
            <h1>Заметки докладчика</h1>
            <div className={style.notes}>
                <p>{notes[index]}</p>
            </div>
            <div className={style.controls}>
                <button onClick={onPrevSlide}>Предыдущий слайд</button>
                <button onClick={onNextSlide}>Следующий слайд</button>
            </div>
        </div>
    )
}

export default SpeakerNotesWindow