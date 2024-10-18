import { SELECTED_OBJECT_OUTLINE } from "../../storage/constants"
import { SlideObjectType } from "../../storage/types"
import { TextArea } from "./textArea/TextArea"
import { Image } from "./image/Image"
import { CSSProperties } from "react"
import style from './SlideObject.module.css'

type SlideObjectProps = {
    object: SlideObjectType,
    isSelected: boolean,
    scale: number
}

function SlideObject({ object, isSelected, scale }: SlideObjectProps) {
    const slideObjectStyle: CSSProperties = {
        left: object.pos.x * scale,
        top: object.pos.y * scale,
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
        <div className={style.slideObject} style={slideObjectStyle}>
            {obj}
        </div>
    )
}

export { SlideObject }