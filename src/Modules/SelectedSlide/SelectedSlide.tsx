import { SlideType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import style from './SelectedSlide.module.css'

type SelectedSlideProps = SlideType

function SelectedSlide(selectedSlideProps: SelectedSlideProps) {
    return (
        <div className={style.selectedSlide}>
            <Slide
                id={selectedSlideProps.id}
                background={selectedSlideProps.background}
                objects={selectedSlideProps.objects} />
        </div>
    )
}

export { SelectedSlide }