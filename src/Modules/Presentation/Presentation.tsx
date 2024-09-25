import { GlobalSelectionType, SlideType } from "../../Model/types"
import { SlideCollection } from "../SlideCollection/SlideCollection"
import { WorkArea } from "../WorkArea/WorkArea"
import style from './Presentation.module.css'

type PresentationProps = {
    title: string,
    slides: Array<SlideType>,
    selection: GlobalSelectionType,
}

function Presentation(presentationProps: PresentationProps) {
    return (
        <>
            <h1 className={style.presentationTitle}>{presentationProps.title}</h1>
            <div className={style.presentation}>
                    <SlideCollection slides={presentationProps.slides} />
                    <WorkArea slide={presentationProps.selection.SelectedSlide} />
            </div>
        </>
    )
}

export { Presentation }