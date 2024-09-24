import { GlobalSelectionType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import { SlidePreview } from "../SlidePreview/SlidePreview"
import style from './Presentation.module.css'

type PresentationProps = {
    title: string,
    slidesIds: Array<string>
    selection: GlobalSelectionType
}

function Presentation(presentationProps: PresentationProps) {
    return (
        <>
            <h1 className={style.presentationTitle}>{presentationProps.title}</h1>
            <div className={style.presentation}>
                <div className={style.slideCollection}>
                    {
                        presentationProps.slidesIds.map(slide =>
                            <div className={style.slideCollectionItemDiv} key={slide} >
                                <h3>{presentationProps.slidesIds.indexOf(slide) + 1}</h3>
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