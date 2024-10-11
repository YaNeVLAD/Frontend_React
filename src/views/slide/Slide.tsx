import { selectSlideBackgroundType } from "../../storage/actions/slide/selectBackground"
import { SlideObject } from "../../components/slideObject/SlideObject"
import { BackgroundType, SlideObjectType } from "../../storage/types"
import { SELECTED_SLIDE_OUTLINE } from "../../storage/constants"
import { CSSProperties } from "react"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    selectedObjectId: string | undefined,
    objects: Array<SlideObjectType>
    background: BackgroundType,
    isSelected: boolean,
    className: string,
    scale: number,
}

function Slide(props: SlideProps) {

    const slideStyle: CSSProperties = {}
    if (props.isSelected) slideStyle.outline = SELECTED_SLIDE_OUTLINE

    selectSlideBackgroundType(slideStyle, props.background)

    return (
        <div style={slideStyle} className={`${style.slide} ${props.className}`}>
            {
                props.objects.map(
                    object => <SlideObject
                        key={object.id}
                        object={object}
                        isSelected={object.id == props.selectedObjectId}
                        scale={props.scale} />
                )
            }
        </div>
    )
}

export { Slide }