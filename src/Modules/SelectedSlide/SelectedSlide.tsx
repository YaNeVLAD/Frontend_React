import { SlideType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import style from './SelectedSlide.module.css'

type SelectedSlideProps = SlideType

function SelectedSlide(selectedSlideProps: SelectedSlideProps) {
    return (
        <div className={style.selectedSlide}>
            <Slide
                id={selectedSlideProps.id}
                objects={selectedSlideProps.objects}
                background={selectedSlideProps.background} />
        </div>
    )
}

export { SelectedSlide }