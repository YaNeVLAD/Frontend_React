import { SELECTED_OBJECT_OUTLINE, SELECTED_OBJECT_OUTLINE_SHADOW } from "../../storage/constants"
import ResizableHandlers from "./ResizableHandlers/resizableHandlers"
import { SlideObjectType } from "../../storage/types"
import { useAppActions } from "../../hooks/useRedux"
import useDragAndDrop from "./hooks/useDragAndDrop"
import { TextArea } from "./TextArea/TextArea"
import { Image } from "./Image/Image"
import { useRef } from "react"
import style from './SlideObject.module.css'

type SlideObjectProps = {
    object: SlideObjectType
    slideId: string
    scale: number
    isSelected: boolean
    parentRef: React.RefObject<HTMLElement>
}

const SlideObject = ({ object, slideId, scale, isSelected, parentRef }: SlideObjectProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const { moveObject, selectObject } = useAppActions()

    const currentPosition = useDragAndDrop(
        ref,
        parentRef,
        object.pos,
        (pos) => moveObject(slideId, object.id, pos)
    )

    if (!object) return null

    const slideObjectStyle = {
        left: `${currentPosition.x - object.size.width / 2}%`,
        top: `${currentPosition.y - object.size.height / 2}%`,
        width: `${object.size.width}%`,
        height: `${object.size.height}%`,
        transform: `rotate(${object.turnAngle}deg)`,
        outline: isSelected ? SELECTED_OBJECT_OUTLINE : "",
        boxShadow: isSelected ? SELECTED_OBJECT_OUTLINE_SHADOW : "",
    }

    const renderObject = () => {
        switch (object.type) {
            case "textObj":
                return <TextArea context={object} scale={scale} />
            case "imageObj":
                return <Image context={object} scale={scale} />
            default:
                throw new Error("Unknown object type")
        }
    }

    return (
        <div
            ref={ref}
            className={style.slideObject}
            style={slideObjectStyle}
            onMouseDown={(e) => {
                e.preventDefault()
                selectObject(object.id)
            }}
        >
            {renderObject()}
            {isSelected && <ResizableHandlers />}
        </div>
    )
}

export { SlideObject }