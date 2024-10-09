import { ImageType, TextAreaType } from "../../storage/types"
import { TextArea } from "../../views/textArea/TextArea"
import { Image } from "../../views/image/Image"
import { dispatch } from "../../storage/editor"
import { selectObject } from "../../storage/functions"
import style from './SlideObject.module.css'
import { CSSProperties } from "react"

type SlideObjectProps = {
    isSelected: boolean
    object: TextAreaType | ImageType,
}

function SlideObject(props: SlideObjectProps) {
    function onClick() {
        dispatch(selectObject, { id: props.object.id })
    }

    let object
    switch (props.object.type) {
        case 'textObj':
            object = <TextArea
                object={props.object}
                onClick={onClick} />
            break
        case 'imageObj':
            object = <Image
                object={props.object}
                onClick={onClick} />
            break
        default:
            throw new Error(`Unknown slide object type ${props.object}`)
    }

    const slideObjectStyle: CSSProperties = {
        left: props.object.pos.x,
        top: props.object.pos.y,
        width: props.object.size.width,
        height: props.object.size.height,
        transform: 'rotate(' + props.object.turnAngle + 'deg)',
    }

    if (props.isSelected) slideObjectStyle.border = 'solid 5px #6565FF'

    return (
        <div className={style.slideObject} style={slideObjectStyle}>
            {object}
        </div>
    )
}

export { SlideObject }