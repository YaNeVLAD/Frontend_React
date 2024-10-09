import { SlideObjectType } from "../../storage/types"
import { TextArea } from "../../views/textArea/TextArea"
import { Image } from "../../views/image/Image"
import { dispatch } from "../../storage/editor"
import { selectObject } from "../../storage/functions"
import { CSSProperties } from "react"
import style from './SlideObject.module.css'

type SlideObjectProps = {
    object: SlideObjectType,
    isSelected: boolean,
    scale: number
}

function SlideObject({ object, isSelected, scale }: SlideObjectProps) {
    const onObjectClick = () => dispatch(selectObject, { id: object.id })

    let obj
    switch (object.type) {
        case 'textObj':
            obj = <TextArea
                object={object}
                scale={scale}
                onClick={onObjectClick} />
            break
        case 'imageObj':
            obj = <Image
                object={object}
                scale={scale}
                onClick={onObjectClick} />
            break
    }

    const slideObjectStyle: CSSProperties = {
        left: object.pos.x * scale,
        top: object.pos.y * scale,
        width: object.size.width * scale,
        height: object.size.height * scale,
        transform: 'rotate(' + object.turnAngle + 'deg)',
    }

    if (isSelected) slideObjectStyle.border = 'solid 5px #6565FF'

    return (
        <div className={style.slideObject} style={slideObjectStyle}>
            {obj}
        </div>
    )
}

export { SlideObject }