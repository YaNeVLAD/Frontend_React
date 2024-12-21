import { useState, useEffect } from "react"
import style from "./SpeakerNotesWindow.module.css"

const SpeakerNotesWindow = () => {
    const [index, setIndex] = useState<number>(0)
    const [maxSlides, setMaxSlides] = useState(0)
    const [notes, setNotes] = useState<Array<string>>([])

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === window.location.origin) {
                if (event.data.type === 'SYNC_SLIDE_P') {
                    const { slideIndex, maxSlides, notes } = event.data
                    setMaxSlides(maxSlides)
                    setIndex(slideIndex)
                    setNotes(notes)
                }
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [])

    const onNextSlide = () => {
        if (index < maxSlides - 1) {
            setIndex(index + 1)
            window.opener.postMessage({
                type: 'SYNC_SLIDE_C',
                slideIndex: index + 1,
            }, window.location.origin)
        }
    }

    const onPrevSlide = () => {
        if (index > 0) {
            setIndex(index - 1)
            window.opener.postMessage({
                type: 'SYNC_SLIDE_C',
                slideIndex: index - 1,
            }, window.location.origin)
        }
    }

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