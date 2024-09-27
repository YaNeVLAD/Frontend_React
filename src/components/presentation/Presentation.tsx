import { GlobalSelectionType, SlideType } from "../../Model/types"
import { CurrentSlide } from "../currentSlide/CurrentSlide"
import style from './Presentation.module.css'
import { SlideCollection } from "../slideCollection/SlideCollection"

type PresentationProps = {
    title: string,
    slides: Array<SlideType>,
    selection: GlobalSelectionType,
}

//Разделить презентацию
function Presentation(presentationProps: PresentationProps) {
    return (
        <div>
            <h1 className={style.presentationTitle}>
                {presentationProps.title}
            </h1>
            <div className={style.presentation}>
                <SlideCollection slides={presentationProps.slides} />
                <CurrentSlide
                    id={presentationProps.selection.selectedSlide.id}
                    objects={presentationProps.selection.selectedSlide.objects}
                    background={presentationProps.selection.selectedSlide.background} />
            </div>
        </div>
    )
}

export { Presentation }