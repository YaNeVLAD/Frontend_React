import { PositionType, SizeType, SlideObjectType } from "../../storage/types"
import { useResizableDragAndDrop } from "./hooks/useResizableDragAndDrop"
import ResizableHandlers from "./resizableHandlers/resizableHandlers"
import { CSSProperties, RefObject, useRef, useState } from "react"
import { selectObject } from "../../storage/actions/objectActions"
import { SELECTED_OBJECT_OUTLINE } from "../../storage/constants"
import { dispatch } from "../../storage/editor"
import { TextArea } from "./textArea/TextArea"
import { Image } from "./image/Image"
import style from './SlideObject.module.css'
import useDragAndDrop from "./hooks/useDragAndDrop"

type SlideObjectProps = {
    object: SlideObjectType,
    isSelected: boolean,
    scale: number,
    parentRef: RefObject<HTMLElement>
}
//Можно сделать хок компонент - resizable. Для изменения поведения объекта.
function SlideObject({ object, isSelected, scale, parentRef }: SlideObjectProps) {
    const ref = useRef(null)
    const [pos, setPos] = useState<PositionType>(object.pos)
    const [size, setSize] = useState<SizeType>(object.size)

    useDragAndDrop(ref, parentRef, object.pos, setPos)
    useResizableDragAndDrop(ref, parentRef, object.pos, object.size, setPos, setSize)

    const slideObjectStyle: CSSProperties = {
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: size.width * scale,
        height: size.height * scale,
        transform: `translate(-50%, -50%) rotate(${object.turnAngle}deg)`,
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
            {isSelected ? <ResizableHandlers /> : <></>}
        </div>
    )
}

export { SlideObject }