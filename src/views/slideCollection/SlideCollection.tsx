import { SlideType } from "../../storage/types"
import { SlidePreview } from "../slidePreview/SlidePreview"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
}

function SlideCollection(slideCollectionProps: SlideCollectionProps) {
    const selectedSlideStyle = {
        borderColor: '#6565FF',
    }

    return (
        <div className={style.slideCollection}>
            {
                slideCollectionProps.slides.map(slide =>
                    <div
                        key={slide.id}
                        className={style.slideCollectionItemDiv}
                        style={selectedSlideStyle}>

                        <h3 className={style.slideCollectionItemTitle}>
                            {slideCollectionProps.slides.indexOf(slide) + 1}
                        </h3>

                        <SlidePreview
                            key={slide.id}
                            id={slide.id}
                            selectedSlideId={slideCollectionProps.selectedSlideId}
                            background={slide.background} />

                    </div>
                )
            }
        </div>
    )
}

export { SlideCollection }