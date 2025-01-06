import { SlideObject } from "../../SlideObject/SlideObject"
import { useAppSelector } from "../../../hooks/useRedux"
import { CSSProperties } from "react"

type ObjectPreviewProps = {
    id: string,
    slideId: string,
    scale: number
}

const ObjectPreview = ({ id, scale, slideId }: ObjectPreviewProps) => {
    const slide = useAppSelector(state => state.editor.presentation.slides.find(
        s => s.id === slideId
    ))

    const object = slide?.objects.find(obj => obj.id === id)

    if (!object) return null

    const objectStyle: CSSProperties = {
        left: `${object.pos.x * scale}px`,
        top: `${object.pos.y * scale}px`,
        width: `${object.size.width * scale}px`,
        height: `${object.size.height * scale}px`,
        transform: `rotate(${object.turnAngle}deg)`,
        position: 'absolute'
    }

    return (
        <div style={objectStyle}>
            <SlideObject
                id={id}
                slideId={slideId}
                scale={scale}
                isSelected={false}
                isEditable={false}
            />
        </div>
    )
}

export { ObjectPreview }