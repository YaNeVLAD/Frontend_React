import { GlobalSelectionType, SlideType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import { SlidePreview } from "../SlidePreview/SlidePreview"
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
                <div className={style.slideCollection}>
                    {
                        presentationProps.slides.map(slide =>
                            <div className={style.slideCollectionItemDiv} key={slide.id} >
                                <h3>{presentationProps.slides.indexOf(slide) + 1}</h3>
                                <SlidePreview />
                            </div>
                        )
                    }
                </div>
                <div className={style.workingArea}>
                    <Slide
                        id={presentationProps.selection.SelectedSlide.id}
                        background={presentationProps.selection.SelectedSlide.background}
                        objects={presentationProps.selection.SelectedSlide.objects}></Slide>
                </div>
            </div>
        </>
    )
}

export { Presentation }