import { moveSlide, selectSlide } from "../../storage/actions/slideActions"
import { useDraggableSlides } from "./hooks/useDraggableSlides"
import { COLLECTION_SLIDE_OBJECT_SCALE } from "../../storage/constants"
import { Slide } from "../../components/slide/Slide"
import { SlideType } from "../../storage/types"
import { dispatch } from "../../storage/editor"
import { useRef } from "react"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
    scale: number
}
//Проблема с обновлением слайда в коллекции здесь. Он не перерисовывается.
//Это может быть из-за того, что сюда передаётся старый объект. 
const SlideCollection = ({ slides, selectedSlideId, scale }: SlideCollectionProps) => {
    console.log(slides)
    
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
                        style={{ position: 'relative' }}
                        onMouseDown={() => dispatch(selectSlide, { id: slide.id })}
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
                                selectedObjectId={undefined}
                                isSelected={slide.id == selectedSlideId}
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