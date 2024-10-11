import { selectSlideBackground } from "../../storage/actions/slide/selectBackground"
import { Background, SlideObjectType } from "../../storage/types"
import { SlideObject } from "../../components/slideObject/SlideObject"
import { CSSProperties } from "react"
import style from './Slide.module.css'

const SELECTED_SLIDE_OUTLINE = 'solid 3.5px #6565FF'

type SlideProps = {
    id: string,
    selectedObjectId: string | undefined,
    objects: Array<SlideObjectType>
    background: Background,
    isSelected: boolean,
    className: string,
    scale: number,
}

function Slide(props: SlideProps) {

    const slideStyle: CSSProperties = {}
    if (props.isSelected) slideStyle.outline = SELECTED_SLIDE_OUTLINE

    selectSlideBackground(slideStyle, props.background)

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