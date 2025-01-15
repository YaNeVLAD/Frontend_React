import { selectSlideBackgroundType } from "../../storage/actions/slideActions"
import { SELECTED_SLIDE_OUTLINE } from "../../storage/constants"
import { ObjectPreview } from "./ObjectPreview/ObjectPreview"
import { useAppSelector } from "../../hooks/useRedux"
import { SlideProps } from "../Slide/Slide"
import { CSSProperties } from "react"
import style from './SlidePreview.module.css'

const SlidePreview = ({ id, className, isSelected, objectScale }: SlideProps) => {
    const slide = useAppSelector(state => state.editor.presentation.slides.find(
        s => s.id == id
    ))

    if (!slide) return (<></>)

    const slideStyle: CSSProperties = {
        outline: isSelected ? SELECTED_SLIDE_OUTLINE : ''
    }

    selectSlideBackgroundType(slideStyle, slide.background)

    return (
        <div
            style={slideStyle}
            className={`${style.slide} ${className || style.preview}`}
        >
            {
                slide.objects.map(object => (
                    <ObjectPreview
                        key={object.id}
                        id={object.id}
                        slideId={slide.id}
                        scale={objectScale}
                    />
                ))
            }
        </div>
    )
}

export { SlidePreview }