import { CSSProperties } from "react"
import { SlideType } from "../../storage/types"
import { SlidePreview } from "../slidePreview/SlidePreview"
import style from './SlideCollection.module.css'

type SlideCollectionProps = {
    slides: Array<SlideType>,
    selectedSlideId: string,
}

// Для отключения взаимодействия использвать в css pointer-events: none
// Родителю задавать onClick, а слайду прокидывать pointer-events: none
function SlideCollection(props: SlideCollectionProps) {
    //Так сделать везде!!! добавить CSSProperties
    const selectedSlideStyle: CSSProperties = {
        border: 'solid 5px #6565FF',
    }

    return (
        <div className={style.slideCollection}>
            {
                props.slides.map(slide =>
                    <div key={slide.id}>
                        <h3 className={style.slideCollectionItemTitle}>
                            {props.slides.indexOf(slide) + 1}
                        </h3>
                        <div
                            className={style.slideCollectionItemDiv}
                            style={props.selectedSlideId == slide.id ? selectedSlideStyle : {}}>
                            <SlidePreview
                                id={slide.id}
                                key={slide.id}
                                background={slide.background} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export { SlideCollection }