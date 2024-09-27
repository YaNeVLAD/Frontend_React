import { GlobalSelectionType, SlideType } from "../../Model/types"
import { CurrentSlide } from "../currentSlide/CurrentSlide"
import { SlideCollection } from "../slideCollection/SlideCollection"
import { ToolsArea } from "../toolsArea/ToolsArea"
import style from './Presentation.module.css'

type PresentationProps = {
    title: string,
    slides: Array<SlideType>,
    selection: GlobalSelectionType,
}

function Presentation(presentationProps: PresentationProps) {
    return (
        <div>
            <h1 className={style.presentationTitle}>{presentationProps.title}</h1>
            <ToolsArea />
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