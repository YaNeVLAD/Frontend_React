import { COLLECTION_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { useGetSelectedSlide } from "../../hooks/useGetSelectedSlide"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import { useDraggableSlides } from "./hooks/useDraggableSlides"
import { Slide } from "../../components/Slide/Slide"
import { useRef } from "react"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    scale: number
}

const SlideCollection = ({ scale }: SlideCollectionProps) => {
    const selectedSlide = useGetSelectedSlide()
    const slides = useAppSelector(state => state.editor.presentation.slides)

    const { selectSlide, moveSlide } = useAppActions()

    const containerRef = useRef<HTMLDivElement>(null)
    const { handleDragStart, handleDragOver, handleDrop, draggingSlideId } = useDraggableSlides({
        slides,
        onReorder: (updatedSlides) => {
            moveSlide(updatedSlides)
        },
        containerRef,
    })

    return (
        <div className={style.slideCollection} ref={containerRef}>
            {
                slides.map(slide => (
                    <div
                        key={slide.id}
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
                                objects={slide.objects}
                                background={slide.background}
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