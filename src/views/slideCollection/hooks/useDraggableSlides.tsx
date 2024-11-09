import { useState, useRef, DragEvent } from "react"
import { SlideType } from "../../../storage/types"

type UseDraggableSlidesProps = {
    slides: Array<SlideType>,
    onReorder: (updatedSlides: Array<SlideType>) => void,
}

function useDraggableSlides({ slides, onReorder }: UseDraggableSlidesProps) {
    const [draggingSlideId, setDraggingSlideId] = useState<string | null>(null)
    const dragOverSlideId = useRef<string | null>(null)

    const handleDragStart = (event: DragEvent<HTMLDivElement>, slideId: string) => {
        setDraggingSlideId(slideId)
        event.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>, slideId: string) => {
        event.preventDefault()
        dragOverSlideId.current = slideId
    }

    const handleDrop = () => {
        if (!draggingSlideId || !dragOverSlideId.current || draggingSlideId === dragOverSlideId.current) {
            setDraggingSlideId(null)
            dragOverSlideId.current = null
            return
        }

        const fromIndex = slides.findIndex(slide => slide.id === draggingSlideId)
        const toIndex = slides.findIndex(slide => slide.id === dragOverSlideId.current)
        const updatedSlides = [...slides]

        const [removed] = updatedSlides.splice(fromIndex, 1)
        updatedSlides.splice(toIndex, 0, removed)

        onReorder(updatedSlides)
        setDraggingSlideId(null)
        dragOverSlideId.current = null
    }

    return {
        handleDragStart,
        handleDragOver,
        handleDrop,
        draggingSlideId,
    }
}

export { useDraggableSlides }
