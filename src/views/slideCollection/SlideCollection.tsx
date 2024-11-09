import { selectSlide } from "../../storage/actions/slide/select"
import { useDraggableSlides } from "./hooks/useDraggableSlides"
import { Slide } from "../../components/slide/Slide"
import { SlideType } from "../../storage/types"
import { dispatch } from "../../storage/editor"
import style from './SlideCollection.module.css'
import { moveSlide } from "../../storage/actions/slide/move"

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
    scale: number
}

function SlideCollection({ slides, selectedSlideId, scale }: SlideCollectionProps) {
    const { handleDragStart, handleDragOver, handleDrop, draggingSlideId } = useDraggableSlides({
        slides,
        onReorder: (updatedSlides) => {
            dispatch(moveSlide, { slides: updatedSlides })
        }
    })

    return (
        <div className={style.slideCollection}>
            {
                slides.map(slide => (
                    <div
                        key={slide.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, slide.id)}
                        onDragOver={(e) => handleDragOver(e, slide.id)}
                        onDrop={handleDrop}
                        onClick={() => dispatch(selectSlide, { id: slide.id })}
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
                                scale={scale} />
                        </div>
                    </div>
                ))
            }
        </div >
    )
}

export { SlideCollection }