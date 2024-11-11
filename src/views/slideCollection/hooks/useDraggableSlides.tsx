import { useState, useRef, useCallback, DragEvent } from "react"
import { SlideType } from "../../../storage/types"
import { SLIDE_COLLECTION_SCROLL_AREA, SLIDE_COLLECTION_SCROLL_SPEED } from "../../../storage/constants"

type UseDraggableSlidesProps = {
    slides: Array<SlideType>,
    onReorder: (updatedSlides: Array<SlideType>) => void,
    containerRef: React.RefObject<HTMLDivElement>
}

const useDraggableSlides = ({ slides, onReorder, containerRef }: UseDraggableSlidesProps) => {
    const [draggingSlideId, setDraggingSlideId] = useState<string | null>(null)
    const dragOverSlideId = useRef<string | null>(null)
    const scrollSpeed = SLIDE_COLLECTION_SCROLL_SPEED

    const handleDragStart = (event: DragEvent<HTMLDivElement>, slideId: string) => {
        setDraggingSlideId(slideId)
        event.dataTransfer.effectAllowed = "move"
    }

    const handleDragOver = useCallback(
        (event: DragEvent<HTMLDivElement>, slideId: string) => {
            event.preventDefault()
            dragOverSlideId.current = slideId

            const container = containerRef.current
            if (container) {
                const { top, bottom } = container.getBoundingClientRect()
                const scrollArea = SLIDE_COLLECTION_SCROLL_AREA

                if (event.clientY < top + scrollArea) {
                    container.scrollBy(0, -scrollSpeed)
                } else if (event.clientY > bottom - scrollArea) {
                    container.scrollBy(0, scrollSpeed)
                }
            }
        },
        [containerRef, scrollSpeed]
    )

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
