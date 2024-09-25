import { GlobalSelectionType, SlideType } from "../../Model/types"
import { SlideCollection } from "../SlideCollection/SlideCollection"
import { SelectedSlide } from "../SelectedSlide/SelectedSlide"
import style from './Presentation.module.css'
import { ToolsArea } from "../ToolsArea/ToolsArea"

type PresentationProps = {
    title: string,
    slides: Array<SlideType>,
    selection: GlobalSelectionType,
}

function Presentation(presentationProps: PresentationProps) {
    return (
        <>
            <h1 className={style.presentationTitle}>{presentationProps.title}</h1>
            <ToolsArea />
            <div className={style.presentation}>
                <SlideCollection slides={presentationProps.slides} />
                <SelectedSlide
                    id={presentationProps.selection.SelectedSlide.id}
                    objects={presentationProps.selection.SelectedSlide.objects}
                    background={presentationProps.selection.SelectedSlide.background} />
            </div>
        </>
    )
}

export { Presentation }