import { moveSlide, selectSlide } from "../../storage/actions/slideActions"
import { useDraggableSlides } from "./hooks/useDraggableSlides"
import { Slide } from "../../components/slide/Slide"
import { SlideType } from "../../storage/types"
import { dispatch } from "../../storage/editor"
import style from './SlideCollection.module.css'
import { useRef } from "react"
import { SELECTED_SLIDE_SCALE } from "../../storage/constants"

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
    scale: number
}

function SlideCollection({ slides, selectedSlideId, scale }: SlideCollectionProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { handleDragStart, handleDragOver, handleDrop, draggingSlideId } = useDraggableSlides({
        slides,
        onReorder: (updatedSlides) => {
            dispatch(moveSlide, { slides: updatedSlides })
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
                        onMouseDown={() => dispatch(selectSlide, { id: slide.id })}
                        onDragStart={(e) => {
                            handleDragStart(e, slide.id)
                        }}
                        onDragOver={(e) => handleDragOver(e, slide.id)}
                        onDrop={handleDrop}
                        className={draggingSlideId === slide.id ? style.draggingSlide : ""}
                    >
                        <h3 className={style.slideCollectionItemTitle}>
                            {slides.indexOf(slide) + 1}
                        </h3>
                        <div className={style.slideCollectionItemDiv}>
                            <Slide
                                id={slide.id}
                                key={slide.id}
                                objects={slide.objects}
                                background={slide.background}
                                selectedObjectId={undefined}
                                isSelected={slide.id == selectedSlideId}
                                className={style.slideCollectionSlide}
                                scale={SELECTED_SLIDE_SCALE}
                                objectScale={scale} />
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export { SlideCollection }