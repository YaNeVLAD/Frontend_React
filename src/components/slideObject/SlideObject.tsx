import { SELECTED_OBJECT_OUTLINE } from "../../storage/constants"
import { CSSProperties, RefObject, useRef, useState } from "react"
import { PositionType, SlideObjectType } from "../../storage/types"
import { selectObject } from "../../storage/actions/objectActions"
import { useDragAndDrop } from "./hooks/useDragAndDrop"
import { dispatch } from "../../storage/editor"
import { TextArea } from "./textArea/TextArea"
import { Image } from "./image/Image"
import style from './SlideObject.module.css'

type SlideObjectProps = {
    object: SlideObjectType,
    isSelected: boolean,
    scale: number,
    parentRef: RefObject<HTMLElement>
}

function SlideObject({ object, isSelected, scale, parentRef }: SlideObjectProps) {
    const ref = useRef(null)
    const [pos, setPos] = useState<PositionType>(object.pos)

    useDragAndDrop(ref, parentRef, object.pos, setPos)

    const slideObjectStyle: CSSProperties = {
        left: pos.x * scale,
        top: pos.y * scale,
        width: object.size.width * scale,
        height: object.size.height * scale,
        transform: `rotate(${object.turnAngle}deg)`,
        outline: isSelected ? SELECTED_OBJECT_OUTLINE : ''
    }

    let obj
    switch (object.type) {
        case 'textObj':
            obj = <TextArea
                context={object}
                scale={scale} />
            break
        case 'imageObj':
            obj = <Image
                context={object}
                scale={scale} />
            break
        default:
            throw Error(`Unknown slide object type.`)
    }

    return (
        <div
            ref={ref}
            onMouseDown={(e) => {
                if (e.defaultPrevented) return
                e.preventDefault()
                dispatch(selectObject, { id: object.id })
            }}

            className={style.slideObject}
            style={slideObjectStyle}>
            {obj}
        </div>
    )
}

export { SlideObject }