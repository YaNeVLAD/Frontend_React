import { selectSlide } from "../../storage/actions/slide/select"
import { Slide } from "../../components/slide/Slide"
import { SlideType } from "../../storage/types"
import { dispatch } from "../../storage/editor"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
    scale: number
}

function SlideCollection({ slides, selectedSlideId, scale }: SlideCollectionProps) {    
    return (
        <div className={style.slideCollection}>
            {
                slides.map(slide =>
                    <div
                        key={slide.id}
                        onClick={() => dispatch(selectSlide, { id: slide.id })}>
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
                )
            }
        </div >
    )
}

export { SlideCollection }