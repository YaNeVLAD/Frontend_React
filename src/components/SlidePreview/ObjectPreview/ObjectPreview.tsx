import { SlideObject } from "../../SlideObject/SlideObject"
import { useAppSelector } from "../../../hooks/useRedux"
import { CSSProperties } from "react"

type ObjectPreviewProps = {
    id: string,
    slideId: string,
    scale: number
}

const ObjectPreview = (props: ObjectPreviewProps) => {
    const slide = useAppSelector(state => state.editor.presentation.slides.find(
        s => s.id == props.slideId
    ))

    const object = slide?.objects.find(obj => obj.id == props.id)

    if (!object) return (<></>)

    const objectStyle: CSSProperties = {
        left: `${object.pos.x * props.scale}px`,
        top: `${object.pos.y * props.scale}px`,
        width: `${object.size.width * props.scale}px`,
        height: `${object.size.height * props.scale}px`,
        transform: `rotate(${object.turnAngle}deg)`,
    }

    return (
        <div
            style={{ ...objectStyle, position: 'absolute' }}
        >
            <SlideObject
                id={props.id}
                slideId={props.slideId}
                scale={props.scale}
                isSelected={false}
            />
        </div>
    )
}

export { ObjectPreview }