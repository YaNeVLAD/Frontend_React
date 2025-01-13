import { selectSlideBackgroundType } from "../../storage/actions/slideActions"
import { ObjectPreview } from "./ObjectPreview/ObjectPreview"
import { SLIDE_WIDTH } from "../../storage/constants"
import { useAppSelector } from "../../hooks/useRedux"
import { CSSProperties } from "react"
import style from './SlidePreview.module.css'

type SlidePreviewProps = {
    id: string,
    scale: number,
    objectScale: number
}

const SlidePreview = (props: SlidePreviewProps) => {
    const slide = useAppSelector(state => state.editor.presentation.slides.find(
        s => s.id == props.id
    ))

    if (!slide) return (<></>)

    const slideStyle: CSSProperties = {
        width: `${SLIDE_WIDTH * props.scale}px`,
        height: `${SLIDE_WIDTH * props.scale}px`
    }

    selectSlideBackgroundType(slideStyle, slide.background)

    return (
        <div
            style={slideStyle}
            className={`${style.slide} ${style.preview}`}
        >
            {
                slide.objects.map(object => (
                    <ObjectPreview
                        key={object.id}
                        id={object.id}
                        slideId={slide.id}
                        scale={props.scale}
                    />
                ))
            }
        </div>
    )
}

export { SlidePreview }