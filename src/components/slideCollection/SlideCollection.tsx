import { SlideType } from "../../Model/types"
import { SlidePreview } from "../slidePreview/SlidePreview"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    slides: Array<SlideType>
}

function SlideCollection(slideCollectionProps: SlideCollectionProps) {
    return (
        <div className={style.slideCollection}>
            {
                slideCollectionProps.slides.map(slide =>
                    <div className={style.slideCollectionItemDiv} key={slide.id} >
                        <h3 className={style.slideCollectionItemTitle}>{slideCollectionProps.slides.indexOf(slide) + 1}</h3>
                        <SlidePreview
                            key={slide.id}
                            id={slide.id}
                            background={slide.background} />
                    </div>
                )
            }
        </div>
    )
}

export { SlideCollection }