import { ResizableSlideObject } from "../SlideObject/ResizableHandlers/ResizableSlideObject"
import { selectSlideBackgroundType } from "../../storage/actions/slideActions"
import { SELECTED_SLIDE_OUTLINE } from "../../storage/constants"
import { CSSProperties, useRef } from "react"
import style from './Slide.module.css'
import { useAppSelector } from "../../hooks/useRedux"

type SlideProps = {
    id: string,
    selectedObjectId?: string,
    isSelected: boolean,
    className: string,
    scale: number,
    objectScale: number
}

const Slide = (props: SlideProps) => {
    const slide = useAppSelector(state => state.editor.presentation.slides.find(
        s => s.id == props.id
    ))

    const ref = useRef<HTMLDivElement>(null)

    const slideStyle: CSSProperties = {
        transform: `scale(${props.scale})`,
        outline: props.isSelected ? SELECTED_SLIDE_OUTLINE : ''
    }

    if (!slide) return (<></>)

    selectSlideBackgroundType(slideStyle, slide.background)

    return (
        <div
            ref={ref}
            style={slideStyle}
            className={`${style.slide} ${props.className}`}>
            {
                slide.objects.map(
                    object => <ResizableSlideObject
                        key={object.id}
                        id={object.id}
                        slideId={slide.id}
                        isSelected={object.id == props.selectedObjectId}
                        parentRef={ref}
                        scale={props.objectScale} />
                )
            }
        </div>
    )
}

export { Slide }