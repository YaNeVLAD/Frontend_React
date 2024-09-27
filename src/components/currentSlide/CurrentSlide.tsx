import { SlideType } from "../../Model/types"
import { Slide } from "../slide/Slide"
import style from './CurrentSlide.module.css'

type CurrentSlideProps = SlideType

function CurrentSlide(selectedSlideProps: CurrentSlideProps) {
    return (
        <div className={style.selectedSlide}>
            <Slide
                id={selectedSlideProps.id}
                objects={selectedSlideProps.objects}
                background={selectedSlideProps.background} />
        </div>
    )
}

export { CurrentSlide }