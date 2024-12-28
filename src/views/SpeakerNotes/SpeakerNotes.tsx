import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { useCallback, useEffect, useState } from "react"
import { useAppActions } from "../../hooks/useRedux"
import styles from "./SpeakerNotes.module.css"

type SpeakerNotesProps = {
    notesHeight: number
    setNotesHeight: (height: (prevHeight: number) => number) => void
}

const SpeakerNotes = ({ notesHeight, setNotesHeight }: SpeakerNotesProps) => {
    const [dragging, setDragging] = useState(false)
    const [note, setNote] = useState('')
    const { changeSlideNote } = useAppActions()
    const selectedSlide = useSelectedSlide()

    useEffect(() => {
        if (selectedSlide) {
            setNote(selectedSlide.note || '')
        }
    }, [selectedSlide])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (dragging) {
            setNotesHeight(prevHeight => Math.max(180, prevHeight - e.movementY))
        }
    }, [dragging, setNotesHeight])

    const handleMouseUp = useCallback(() => {
        setDragging(false)
    }, [])

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        } else {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [dragging, handleMouseMove, handleMouseUp])

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value)
        if (selectedSlide) {
            changeSlideNote(e.target.value, selectedSlide.id)
        }
    }

    return (
        <div className={styles.speakerNotesContainer} style={{ height: notesHeight }}>
            <div
                className={styles.speakerNotesDragger}
                style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                onMouseDown={() => setDragging(true)}
            >
                <div className={styles.speakerNotesDraggerThumb} />
            </div>
            <div className={styles.speakerNotesWorkspace}>
                <textarea
                    value={note}
                    onChange={handleNoteChange}
                    className={styles.textarea}
                    style={{height: notesHeight}}
                    placeholder="Нажмите, чтобы добавить заметки докладчика"
                />
            </div>
        </div>
    )
}

export default SpeakerNotes