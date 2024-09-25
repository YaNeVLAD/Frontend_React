import { SlideType } from "../../Model/types"
import { Slide } from "../Slide/Slide"
import style from './WorkArea.module.css'

type WorkAreaProps = {
    slide: SlideType
}

function WorkArea(workAreaProps: WorkAreaProps) {
    return (
        <div className={style.workArea}>
            <Slide
                id={workAreaProps.slide.id}
                background={workAreaProps.slide.background}
                objects={workAreaProps.slide.objects} />
        </div>
    )
}

export { WorkArea }