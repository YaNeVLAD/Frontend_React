import { ResizableSlideObject } from "../SlideObject/ResizableHandlers/ResizableSlideObject"
import { selectSlideBackgroundType } from "../../storage/actions/slideActions"
import { BackgroundType, SlideObjectType } from "../../storage/types"
import { SELECTED_SLIDE_OUTLINE } from "../../storage/constants"
import { CSSProperties, useRef } from "react"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    selectedObjectId?: string,
    objects: Array<SlideObjectType>
    background: BackgroundType,
    isSelected: boolean,
    className: string,
    scale: number,
    objectScale: number
}

const Slide = (props: SlideProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const slideStyle: CSSProperties = {}
    if (props.isSelected) slideStyle.outline = SELECTED_SLIDE_OUTLINE
    slideStyle.transform = `scale(${props.scale})`

    selectSlideBackgroundType(slideStyle, props.background)

    return (
        <div
            ref={ref}
            style={slideStyle}
            className={`${style.slide} ${props.className}`}>
            {
                props.objects.map(
                    object => <ResizableSlideObject
                        key={object.id}
                        slideId={props.id}
                        object={object}
                        isSelected={object.id == props.selectedObjectId}
                        parentRef={ref}
                        scale={props.objectScale} />
                )
            }
        </div>
    )
}

export { Slide }