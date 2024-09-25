import { GlobalSelectionType, SlideType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import { SlideCollection } from "../SlideCollection/SlideCollection"
// import { SlidePreview } from "../SlidePreview/SlidePreview"
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
                <div className={style.workingArea}>
                    <Slide
                        id={presentationProps.selection.SelectedSlide.id}
                        background={presentationProps.selection.SelectedSlide.background}
                        objects={presentationProps.selection.SelectedSlide.objects} />
                </div>
            </div>
        </>
    )
}

export { Presentation }