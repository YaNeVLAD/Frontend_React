import { COLLECTION_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { useGetSelectedSlide } from "../../hooks/useGetSelectedSlide"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import { useDraggableSlides } from "./hooks/useDraggableSlides"
import { Slide } from "../../components/Slide/Slide"
import { useEffect, useRef } from "react"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    scale: number
}

const SlideCollection = ({ scale }: SlideCollectionProps) => {
    const selectedSlide = useGetSelectedSlide()
    const slides = useAppSelector(state => state.editor.presentation.slides)

    const { selectSlide, moveSlide } = useAppActions()

    const containerRef = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<Record<string, HTMLDivElement | null>>({})

    const { handleDragStart, handleDragOver, handleDrop, draggingSlideId } = useDraggableSlides({
        slides,
        onReorder: (updatedSlides) => {
            moveSlide(updatedSlides)
        },
        containerRef,
    })

    useEffect(() => {
        if (selectedSlide) {
            const selectedElement = slideRefs.current[selectedSlide.id]
            if (selectedElement && containerRef.current) {
                const container = containerRef.current
                const elementRect = selectedElement.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()

                if (elementRect.top < containerRect.top) {
                    container.scrollTop += elementRect.top - containerRect.top
                } else if (elementRect.bottom > containerRect.bottom) {
                    container.scrollTop += elementRect.bottom - containerRect.bottom
                }
            }
        }
    }, [selectedSlide])

    return (
        <div className={style.slideCollection} ref={containerRef}>
            {
                slides.map(slide => (
                    <div
                        key={slide.id}
                        ref={(el) => slideRefs.current[slide.id] = el}
                        draggable
                        style={{ position: 'relative' }}
                        onMouseDown={() => selectSlide(slide.id)}
                        onDragStart={(e) => {
                            handleDragStart(e, slide.id)
                        }}
                        onDragOver={(e) => handleDragOver(e, slide.id)}
                        onDrop={handleDrop}
                        className={draggingSlideId === slide.id ? style.draggingSlide : ""}>
                        <h3 className={style.slideCollectionItemTitle}>
                            {slides.indexOf(slide) + 1}
                        </h3>
                        <div className={style.slideCollectionItemDiv}>
                            <Slide
                                id={slide.id}
                                key={slide.id}
                                isSelected={slide.id == selectedSlide?.id}
                                className={style.slideCollectionSlide}
                                scale={scale}
                                objectScale={COLLECTION_SLIDE_OBJECT_SCALE} />
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export { SlideCollection }